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
    currentTitle,
    keyword,
    currentJobLocation,
    skill,
    school,
    currentCompany,
    currentCompanyIndustry,
    currentCompanySize,
    currentCompanyFundingStage,
    currentCompanyInvestor,
    yearsOfExperienceMin,
    yearsOfExperienceMax,
    isCurrentlyEmployed,
    matchLogic = 'and',
    count = '25',
    offset = '0',
    enrichLive = 'false',
    outputVariable,
  } = inputs;

  // Split a comma-separated string into a trimmed, non-empty array.
  const toArray = (str: string | undefined): string[] =>
    !str
      ? []
      : str
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);

  const conditions: Array<Record<string, any>> = [];

  // Text fields supporting both "in" (exact, multi) and "like" (single contains).
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

  // Enum/band fields that only accept exact membership ("in").
  const addInFilter = (column: string, raw: string | undefined) => {
    const values = toArray(raw);
    if (values.length > 0) {
      conditions.push({ column, type: 'in', value: values });
    }
  };

  addTextFilter('current_title', currentTitle);
  if (keyword) {
    conditions.push({ column: 'keyword', type: 'like', value: keyword });
  }
  addTextFilter('current_job_location', currentJobLocation);
  addTextFilter('skill', skill);
  addTextFilter('school', school);
  addTextFilter('current_company', currentCompany);
  addTextFilter('current_company_industry', currentCompanyIndustry);
  addInFilter('current_company_size', currentCompanySize);
  addInFilter('current_company_funding_stage', currentCompanyFundingStage);
  addTextFilter('current_company_investor', currentCompanyInvestor);

  // Years of experience: range via between / >= / <=.
  if (yearsOfExperienceMin && yearsOfExperienceMax) {
    conditions.push({
      column: 'years_of_experience',
      type: 'between',
      value: parseInt(yearsOfExperienceMin, 10),
      value2: parseInt(yearsOfExperienceMax, 10),
    });
  } else if (yearsOfExperienceMin) {
    conditions.push({
      column: 'years_of_experience',
      type: '>=',
      value: parseInt(yearsOfExperienceMin, 10),
    });
  } else if (yearsOfExperienceMax) {
    conditions.push({
      column: 'years_of_experience',
      type: '<=',
      value: parseInt(yearsOfExperienceMax, 10),
    });
  }

  if (isCurrentlyEmployed === 'true' || isCurrentlyEmployed === 'false') {
    conditions.push({
      column: 'is_currently_employed',
      type: '=',
      value: isCurrentlyEmployed === 'true',
    });
  }

  if (conditions.length === 0) {
    throw new Error(
      'Please provide at least one filter (e.g. a job title or skill) to search for people.',
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

  log(`Searching DataForB2B for people with ${conditions.length} filter(s)...`);

  const response = await fetch('https://api.dataforb2b.ai/search/people', {
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
  log(`Found ${data.total ?? data.count ?? 0} matching people.`);
  setOutput(outputVariable, data);
};
