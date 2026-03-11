import { EyePop } from '@eyepop.ai/eyepop';

export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey, accountId } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your EyePop.ai API key in the service settings.',
    );
  }
  if (!accountId) {
    throw new Error(
      'Missing Account ID. Please configure your EyePop.ai Account ID in the service settings.',
    );
  }

  const {
    videoUrl,
    textPrompt,
    workerRelease = 'qwen3-instruct',
    fps: fpsStr,
    maxFrames: maxFramesStr,
    imageSize: imageSizeStr,
    outputVariable,
  } = inputs;

  if (!videoUrl) {
    throw new Error('Video URL is required');
  }
  if (!textPrompt) {
    throw new Error('Text Prompt is required');
  }

  const fps = fpsStr ? parseFloat(fpsStr) : 1;
  const maxFrames = maxFramesStr ? parseInt(maxFramesStr, 10) : 16;
  const imageSize = imageSizeStr ? parseInt(imageSizeStr, 10) : 640;

  log(`Starting VLM video analysis...`);
  log(`Model: ${workerRelease} | FPS: ${fps} | Max Frames: ${maxFrames} | Image Size: ${imageSize}`);
  log(`Prompt: "${textPrompt}"`);

  let dataEndpoint: any = null;

  try {
    // Connect to the Data Endpoint
    log('Connecting to EyePop.ai Data API...');
    dataEndpoint = await EyePop.dataEndpoint({
      auth: { apiKey },
      eyepopUrl: 'https://compute.eyepop.ai',
      accountId,
    }).connect();
    log('Connected to EyePop.ai Data API');

    // Create a transient dataset to hold the video
    log('Creating transient dataset...');
    const dataset = await dataEndpoint.createDataset({
      name: `vlm-video-${Date.now()}`,
    });
    const datasetUuid = dataset.uuid;
    log(`Dataset created: ${datasetUuid}`);

    let assetUuid: string;

    try {
      // Import the video as an asset
      log('Importing video asset...');
      const asset = await dataEndpoint.importAsset(datasetUuid, undefined, {
        url: videoUrl,
        mime_type: 'video/mp4',
      });
      assetUuid = asset.uuid;
      log(`Video asset imported: ${assetUuid}`);

      // Wait for asset to be accepted/ready
      log('Waiting for asset to be processed...');
      let assetReady = false;
      for (let i = 0; i < 60; i++) {
        const assetStatus = await dataEndpoint.getAsset(assetUuid, datasetUuid);
        if (assetStatus.status === 'accepted' || assetStatus.status === 'ready') {
          assetReady = true;
          log('Asset is ready for inference');
          break;
        }
        if (assetStatus.status === 'rejected' || assetStatus.status === 'failed') {
          throw new Error(`Asset was rejected/failed: ${assetStatus.status_message || 'unknown reason'}`);
        }
        await new Promise((r) => setTimeout(r, 2000));
      }

      if (!assetReady) {
        throw new Error('Timed out waiting for video asset to be processed');
      }

      // Build the VLM inference request
      const inferRequest = {
        worker_release: workerRelease,
        text_prompt: textPrompt,
        config: {
          fps,
          max_frames: maxFrames,
          image_size: imageSize,
          max_new_tokens: 300,
        },
      };

      log('Running VLM inference on video...');
      const results = await dataEndpoint.inferAsset(assetUuid, inferRequest, datasetUuid);

      // Collect predictions
      const frames: any[] = [];
      const allTexts: string[] = [];

      for await (const prediction of results) {
        const frame: any = {
          timestamp: prediction.seconds ?? null,
          source_width: prediction.source_width,
          source_height: prediction.source_height,
        };

        if (prediction.texts && prediction.texts.length > 0) {
          frame.texts = prediction.texts.map((t: any) => ({
            text: t.text,
            confidence: t.confidence,
            category: t.category,
          }));
          for (const t of prediction.texts) {
            if (t.text) allTexts.push(t.text);
          }
        }

        if (prediction.objects && prediction.objects.length > 0) {
          frame.objects = prediction.objects.map((obj: any) => ({
            classLabel: obj.classLabel || obj.category || 'unknown',
            confidence: obj.confidence,
            x: obj.x,
            y: obj.y,
            width: obj.width,
            height: obj.height,
            texts: obj.texts,
            classes: obj.classes,
          }));
        }

        if (prediction.classes && prediction.classes.length > 0) {
          frame.classes = prediction.classes.map((c: any) => ({
            classLabel: c.classLabel,
            confidence: c.confidence,
            category: c.category,
          }));
        }

        frames.push(frame);
      }

      // Get run info if available (protected field, accessed via runtime)
      let runInfo = null;
      try {
        runInfo = (results as any)._runInfo || null;
      } catch {
        // run info not available
      }

      const outputResult = {
        frames,
        description: allTexts.join(' '),
        summary: {
          framesAnalyzed: frames.length,
          model: workerRelease,
          prompt: textPrompt,
          fps,
          maxFrames,
          imageSize,
        },
        runInfo,
      };

      log(`VLM analysis complete. Analyzed ${frames.length} frame(s).`);
      if (allTexts.length > 0) {
        log(`VLM response: ${allTexts[0].substring(0, 200)}...`);
      }

      setOutput(outputVariable, outputResult);
    } finally {
      // Cleanup: delete the transient dataset
      try {
        log('Cleaning up transient dataset...');
        await dataEndpoint.deleteDataset(datasetUuid);
        log('Transient dataset cleaned up');
      } catch {
        // ignore cleanup errors
      }
    }
  } catch (error: any) {
    const message = error?.message || 'Unknown error occurred during VLM analysis';
    log(`Error: ${message}`);
    setOutput(outputVariable, { error: message });
    throw error;
  } finally {
    if (dataEndpoint) {
      try {
        await dataEndpoint.disconnect();
      } catch {
        // ignore disconnect errors
      }
    }
  }
};
