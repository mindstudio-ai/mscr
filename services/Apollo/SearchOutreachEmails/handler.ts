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
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract inputs with defaults
  const {
    emailStatuses,
    replyClasses,
    keywords,
    perPage = '10',
    page = '1',
    dateRangeMode,
    startDate,
    endDate,
    sequenceIds,
    excludeSequenceIds,
    userIds,
    notSentReasons,
    outputVariable,
  } = inputs;

  // Build query parameters
  const params = new URLSearchParams();

  // Add basic search parameters
  if (emailStatuses && Array.isArray(emailStatuses)) {
    emailStatuses.forEach((status: string) => {
      params.append('emailer_message_stats[]', status);
    });
  } else if (emailStatuses) {
    params.append('emailer_message_stats[]', emailStatuses);
  }

  if (replyClasses && Array.isArray(replyClasses)) {
    replyClasses.forEach((replyClass: string) => {
      params.append('emailer_message_reply_classes[]', replyClass);
    });
  } else if (replyClasses) {
    params.append('emailer_message_reply_classes[]', replyClasses);
  }

  if (keywords) {
    params.append('q_keywords', keywords);
  }

  // Add pagination parameters
  params.append('per_page', perPage.toString());
  params.append('page', page.toString());

  // Add date range filters if provided
  if (dateRangeMode) {
    params.append('emailer_message_date_range_mode', dateRangeMode);

    if (startDate) {
      params.append('emailerMessageDateRange[min]', startDate);
    }

    if (endDate) {
      params.append('emailerMessageDateRange[max]', endDate);
    }
  }

  // Add advanced filters
  if (sequenceIds) {
    const ids = sequenceIds.split(',').map((id) => id.trim());
    ids.forEach((id) => {
      params.append('emailer_campaign_ids[]', id);
    });
  }

  if (excludeSequenceIds) {
    const ids = excludeSequenceIds.split(',').map((id) => id.trim());
    ids.forEach((id) => {
      params.append('not_emailer_campaign_ids[]', id);
    });
  }

  if (userIds) {
    const ids = userIds.split(',').map((id) => id.trim());
    ids.forEach((id) => {
      params.append('user_ids[]', id);
    });
  }

  if (notSentReasons && Array.isArray(notSentReasons)) {
    notSentReasons.forEach((reason: string) => {
      params.append('not_sent_reason_cds[]', reason);
    });
  } else if (notSentReasons) {
    params.append('not_sent_reason_cds[]', notSentReasons);
  }

  // Construct the URL
  const url = `https://api.apollo.io/api/v1/emailer_messages/search?${params.toString()}`;

  log('Searching for outreach emails...');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your Apollo API key.');
      } else if (response.status === 403) {
        throw new Error(
          'Forbidden: This endpoint requires a master API key. Please check your API key permissions.',
        );
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = await response.json();

    log(`Found ${data.emailer_messages?.length || 0} emails on page ${page}`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error searching outreach emails: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while searching outreach emails');
  }
};
