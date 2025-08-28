import { Client } from '@notionhq/client';

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
  // Extract inputs
  const {
    parentType,
    parentId,
    pageTitle,
    pageProperties,
    pageContent,
    iconType,
    iconValue,
    coverImageUrl,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!parentId) {
    throw new Error('Parent ID is required');
  }

  if (!pageTitle) {
    throw new Error('Page title is required');
  }

  // Initialize Notion client
  const token = process.env.token;
  if (!token) {
    throw new Error('Notion API token is missing');
  }

  const notion = new Client({ auth: token });

  log(`Creating new Notion page under ${parentType}: ${parentId}`);

  // Prepare the request body
  const requestBody: any = {
    parent: {
      type: parentType,
      [parentType]: parentId,
    },
    properties: {},
  };

  // Set page title
  if (parentType === 'page_id') {
    // For pages, only title is allowed as a property
    requestBody.properties = {
      title: [
        {
          text: {
            content: pageTitle,
          },
        },
      ],
    };
  } else {
    // For databases, set the title property
    requestBody.properties = {
      Name: {
        title: [
          {
            text: {
              content: pageTitle,
            },
          },
        ],
      },
    };

    // Add additional properties for database pages if provided
    if (pageProperties) {
      try {
        const additionalProps =
          typeof pageProperties === 'string'
            ? JSON.parse(pageProperties)
            : pageProperties;

        requestBody.properties = {
          ...requestBody.properties,
          ...additionalProps,
        };

        log('Added additional page properties');
      } catch (error) {
        log(
          'Warning: Could not parse page properties JSON. Continuing with only title property.',
        );
      }
    }
  }

  // Add icon if provided
  if (iconType && iconType !== 'none' && iconValue) {
    if (iconType === 'emoji') {
      requestBody.icon = {
        type: 'emoji',
        emoji: iconValue,
      };
      log(`Set page icon to emoji: ${iconValue}`);
    } else if (iconType === 'external') {
      requestBody.icon = {
        type: 'external',
        external: {
          url: iconValue,
        },
      };
      log(`Set page icon to external URL`);
    }
  }

  // Add cover image if provided
  if (coverImageUrl) {
    requestBody.cover = {
      type: 'external',
      external: {
        url: coverImageUrl,
      },
    };
    log('Set page cover image');
  }

  // Add content blocks if provided
  if (pageContent) {
    try {
      const contentBlocks =
        typeof pageContent === 'string' ? JSON.parse(pageContent) : pageContent;

      requestBody.children = contentBlocks;
      log('Added content blocks to the page');
    } catch (error) {
      log(
        'Warning: Could not parse page content JSON. Creating page without content.',
      );
    }
  }

  try {
    // Create the page
    const response = await notion.pages.create(requestBody);
    log(`Successfully created Notion page with ID: ${response.id}`);

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    const errorMessage = error.message || 'Unknown error occurred';
    const statusCode = error.status || '';

    if (statusCode === 404) {
      throw new Error(
        `Parent not found: ${parentId}. Please check the ID and ensure your integration has access to it.`,
      );
    } else if (statusCode === 403) {
      throw new Error(
        'Permission denied. Make sure your integration has "Insert Content" capabilities for this page/database.',
      );
    } else {
      throw new Error(`Failed to create Notion page: ${errorMessage}`);
    }
  }
};
