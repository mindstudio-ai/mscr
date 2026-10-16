export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing MrScraper API Key. Please add your API key in the service configuration.',
    );
  }

  const {
    query,
    region,
    language,
    page = '1',
    format = 'json',
    renderJs = 'false',
    outputVariable,
  } = inputs;

  const searchQuery = String(query ?? '').trim();
  if (!searchQuery) {
    throw new Error('Missing Query. Please provide a search query.');
  }

  const pageNumber = Number(String(page || '1').trim());
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    throw new Error('Page must be a whole number of 1 or more.');
  }

  const resultFormat = format === 'html' ? 'html' : 'json';

  const requestBody: Record<string, any> = {
    query: searchQuery,
    page: pageNumber,
    format: resultFormat,
    renderJs: renderJs === 'true',
  };
  if (region && String(region).trim()) {
    requestBody.region = String(region).trim().toLowerCase();
  }
  if (language && String(language).trim()) {
    requestBody.language = String(language).trim();
  }

  // Never echo the API key back in error messages or logs
  const redact = (text: string) => text.split(apiKey).join('[REDACTED]');

  log(
    `Searching Google for "${searchQuery}" (page ${pageNumber}) with MrScraper...`,
  );

  try {
    const response = await fetch(
      'https://sync.scraper.mrscraper.com/api/google/serp/v2/sync',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'x-api-token': apiKey,
        },
        body: JSON.stringify(requestBody),
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your MrScraper API key in the service configuration.',
        );
      }
      if (response.status === 429) {
        throw new Error(
          'MrScraper rate limit exceeded. Please try again later.',
        );
      }
      throw new Error(
        `MrScraper search request failed (${response.status}): ${redact(responseText).slice(0, 500)}`,
      );
    }

    // JSON responses look like {success, message, data, tokenUsage}
    let payload: any = responseText;
    const contentType = (
      response.headers.get('content-type') || ''
    ).toLowerCase();
    if (contentType.includes('application/json')) {
      try {
        payload = JSON.parse(responseText);
      } catch {
        throw new Error(
          'MrScraper returned a response that is not valid JSON.',
        );
      }
    }
    const isObject = (value: unknown): value is Record<string, any> =>
      Boolean(value) && typeof value === 'object' && !Array.isArray(value);

    if (isObject(payload) && payload.success === false) {
      const detail =
        typeof payload.message === 'string' && payload.message
          ? payload.message
          : 'no details were returned';
      throw new Error(`MrScraper search failed: ${redact(detail)}`);
    }

    const results =
      isObject(payload) && 'data' in payload ? payload.data : payload;
    const tokenNote =
      isObject(payload) && payload.tokenUsage !== undefined
        ? ` (${payload.tokenUsage} tokens used)`
        : '';

    if (resultFormat === 'json') {
      if (!isObject(results)) {
        throw new Error('MrScraper returned no parsed search results.');
      }
      const organicCount = Array.isArray(results.organic)
        ? results.organic.length
        : 0;
      log(`Found ${organicCount} organic results${tokenNote}.`);
      setOutput(outputVariable, results);
      return;
    }

    // The results page HTML arrives as {data: {html}} or as a plain string
    const html =
      typeof results === 'string'
        ? results
        : isObject(results) && typeof results.html === 'string'
          ? results.html
          : '';
    if (!html) {
      throw new Error('MrScraper returned no results page HTML.');
    }
    log(
      `Retrieved ${html.length} characters of results page HTML${tokenNote}.`,
    );
    setOutput(outputVariable, html);
  } catch (error) {
    const errorMessage = redact(
      error instanceof Error ? error.message : String(error),
    );
    log(`Error searching Google: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};
