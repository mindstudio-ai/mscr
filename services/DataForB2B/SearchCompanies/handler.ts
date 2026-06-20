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
      'Missing DataForB2B API Key. Please add your API key in the service configuration.',
    );
  }

  const {
    name,
    keyword,
    industry,
    category,
    employeeCount,
    countryIsoCode,
    city,
    region,
    foundedYearMin,
    foundedYearMax,
    hasFunding,
    fundingStage,
    matchLogic = 'and',
    count = '25',
    offset = '0',
    enrichLive = 'false',
    outputVariable,
  } = inputs;

  const toArray = (str: string | undefined): string[] =>
    !str
      ? []
      : str
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);

  const conditions: Array<Record<string, any>> = [];

  const addTextFilter = (column: string, raw: string | undefined) => {
    const values = toArray(raw);
    if (values.length === 0) {
      return;
    }
    if (values.length === 1) {
      conditions.push({ column, type: 'like', value: values[0] });
    } else {
      conditions.push({ column, type: 'in', value: values });
    }
  };

  const addInFilter = (column: string, raw: string | undefined) => {
    const values = toArray(raw);
    if (values.length > 0) {
      conditions.push({ column, type: 'in', value: values });
    }
  };

  addTextFilter('name', name);
  if (keyword) {
    conditions.push({ column: 'keyword', type: 'like', value: keyword });
  }
  addTextFilter('industry', industry);
  addTextFilter('category', category);
  addInFilter('employee_count', employeeCount);
  addInFilter('country_iso_code', countryIsoCode);
  addTextFilter('city', city);
  addTextFilter('region', region);
  addInFilter('funding_stage_normalized', fundingStage);

  // Founded year: range via between / >= / <=.
  if (foundedYearMin && foundedYearMax) {
    conditions.push({
      column: 'founded_year',
      type: 'between',
      value: parseInt(foundedYearMin, 10),
      value2: parseInt(foundedYearMax, 10),
    });
  } else if (foundedYearMin) {
    conditions.push({
      column: 'founded_year',
      type: '>=',
      value: parseInt(foundedYearMin, 10),
    });
  } else if (foundedYearMax) {
    conditions.push({
      column: 'founded_year',
      type: '<=',
      value: parseInt(foundedYearMax, 10),
    });
  }

  if (hasFunding === 'true' || hasFunding === 'false') {
    conditions.push({
      column: 'has_funding',
      type: '=',
      value: hasFunding === 'true',
    });
  }

  if (conditions.length === 0) {
    throw new Error(
      'Please provide at least one filter (e.g. an industry or company size) to search for companies.',
    );
  }

  const requestBody = {
    filters: {
      op: matchLogic === 'or' ? 'or' : 'and',
      conditions,
    },
    count: parseInt(count, 10),
    offset: parseInt(offset, 10),
    enrich_live: enrichLive === 'true',
  };

  log(
    `Searching DataForB2B for companies with ${conditions.length} filter(s)...`,
  );

  const response = await fetch('https://api.dataforb2b.ai/search/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 429) {
      throw new Error(
        'DataForB2B rate limit exceeded. Please try again in a moment.',
      );
    }
    throw new Error(
      `DataForB2B request failed: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  const data = await response.json();
  log(`Found ${data.total ?? data.count ?? 0} matching companies.`);
  setOutput(outputVariable, data);
};
