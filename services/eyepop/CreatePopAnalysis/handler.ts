import { EyePop, TransientPopId } from '@eyepop.ai/eyepop';

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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your EyePop.ai API key in the service settings.',
    );
  }

  const { contentUrl, contentType, popConfiguration, outputVariable } = inputs;

  if (!contentUrl) {
    throw new Error('Content URL is required');
  }

  if (!popConfiguration) {
    throw new Error(
      'EyePop Configuration is required. Please provide a composable Pop configuration.',
    );
  }

  log(`Starting analysis of ${contentType} content using EyePop.ai...`);

  let endpoint: any = null;

  try {
    // Parse the composable pop configuration (may arrive as string or pre-parsed object)
    let popConfig: any;
    if (typeof popConfiguration === 'object') {
      popConfig = popConfiguration;
      log('Using pre-parsed composable Pop configuration');
    } else {
      try {
        popConfig = JSON.parse(popConfiguration.trim());
        log('Parsed composable Pop configuration');
      } catch (parseError: any) {
        const errorMessage = `Invalid configuration format. Please provide a valid JSON composable Pop configuration. Error: ${parseError.message}`;
        log(errorMessage);
        setOutput(outputVariable, { error: errorMessage });
        return;
      }
    }

    // Validate the config has components
    if (!popConfig.components || !Array.isArray(popConfig.components)) {
      const errorMessage =
        'Invalid composable Pop configuration. Must include a "components" array.';
      log(errorMessage);
      setOutput(outputVariable, { error: errorMessage });
      return;
    }

    // Connect to EyePop using the SDK with a transient pipeline
    log('Connecting to EyePop.ai...');
    endpoint = await EyePop.workerEndpoint({
      auth: { apiKey },
      eyepopUrl: 'https://compute.eyepop.ai',
      popId: TransientPopId.Transient,
      stopJobs: false,
    }).connect();

    log('Connected to EyePop.ai successfully');

    // Apply the composable pop configuration
    log('Applying composable Pop configuration...');
    await endpoint.changePop(popConfig);
    log('Composable Pop configuration applied');

    // Process the content
    log('Analyzing content...');
    const results = await endpoint.process({ url: contentUrl });

    // Collect all predictions
    const allObjects: any[] = [];

    for await (const prediction of results) {
      if (prediction.objects && Array.isArray(prediction.objects)) {
        for (const obj of prediction.objects) {
          allObjects.push({
            classLabel: obj.classLabel || obj.category || 'unknown',
            confidence: obj.confidence,
            x: obj.x,
            y: obj.y,
            width: obj.width,
            height: obj.height,
            orientation: obj.orientation,
            keyPoints: obj.keyPoints,
            objects: obj.objects,
            classes: obj.classes,
            texts: obj.texts,
            meshs: obj.meshs,
          });
        }
      }
    }

    // Build output
    const objectsFound = allObjects.map((obj) => obj.classLabel);

    log(`Detected ${allObjects.length} object(s):`);
    allObjects.forEach((obj, index) => {
      log(
        `  ${index + 1}. ${obj.classLabel} (confidence: ${(obj.confidence * 100).toFixed(1)}%)`,
      );
      if (obj.x !== undefined) {
        log(
          `     Location: [x:${obj.x.toFixed(1)}, y:${obj.y.toFixed(1)}, width:${obj.width.toFixed(1)}, height:${obj.height.toFixed(1)}]`,
        );
      }
    });

    const outputResult = {
      objects: allObjects,
      summary: {
        totalObjects: allObjects.length,
        objectsFound,
      },
    };

    log(`Successfully analyzed ${contentType} content with EyePop.ai`);
    log(`Found ${outputResult.summary.totalObjects} objects`);

    setOutput(outputVariable, outputResult);
  } catch (error: any) {
    const message = error?.message || 'Unknown error occurred during analysis';
    log(`Error analyzing content: ${message}`);
    setOutput(outputVariable, { error: message });
    throw error;
  } finally {
    if (endpoint) {
      try {
        await endpoint.disconnect();
      } catch {
        // ignore disconnect errors
      }
    }
  }
};
