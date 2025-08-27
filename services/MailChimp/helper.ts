const exampleCode = `
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});

const run = async () => {
  const response = await client.campaigns.update("campaign_id", {
    settings: {
      subject_line: "subject_line",
      from_name: "from_name",
      reply_to: "reply_to",
    },
  });
  console.log(response);
};

run();
`.trim();

const exampleCode2 = `
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});

const run = async () => {
  const response = await client.lists.updateList("list_id", {
    name: "name",
    permission_reminder: "permission_reminder",
    email_type_option: false,
    contact: {
      company: "company",
      address1: "address1",
      city: "city",
      state: "state",
      zip: "zip",
      country: "country",
    },
    campaign_defaults: {
      from_name: "from_name",
      from_email: "Kristoffer88@hotmail.com",
      subject: "subject",
      language: "language",
    },
  });
  console.log(response);
};

run();
`.trim();

const getEndpoints = async () => {
  const req = await fetch(
    'https://mailchimp.com/developer/spec/marketing.json',
  );
  const res = await req.json();

  const allowedPaths = [
    '/campaigns',
    '/automations',
    '/conversations',
    '/file-manager',
    '/lists',
    '/ping',
    '/reporting',
    '/reports',
    '/search-campaigns',
    '/search-members',
  ];

  const { paths } = res;
  const actions = Object.entries(paths).reduce((acc: any[], action) => {
    const path = action[0] as string;

    const isAllowedPath = allowedPaths.some(
      (allowedPath) =>
        path === allowedPath || path.startsWith(`${allowedPath}/`),
    );
    if (!isAllowedPath) {
      return acc;
    }

    const methods = action[1] as Record<string, any>;

    Object.keys(methods as Record<string, any>).forEach((method) => {
      acc.push({
        method,
        path,
        ...methods[method],
      });
    });
    return acc;
  }, []);

  const resolvedList: string[] = [];
  for (const action of actions) {
    const input = `
<example_code>
${exampleCode}
</example_code>

<example_code>
${exampleCode2}
</example_code>

<swagger_definition>
${JSON.stringify(action, null, 2)}
</swagger_definition>

Using the provided swagger definition, write the connector for the action. Example code is provided for a different endpoint to show how the swagger definition translates to the package.
    `.trim();
    resolvedList.push(input);
  }

  // Now, send to MindStudio agent
  const response = await fetch(
    'https://v1.mindstudio-api.com/developer/v2/agents/run',
    {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer sk2bcf44eb4a5f55080839d609b853973107d43a53212c234ffb52559e1b50dc32ea985490fd4c6fc7e5ab3dcf88944d4eda40076aff788d4d576493c3e4810049',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workerId: '3080dca0-0a86-44f2-be5e-6875e178603b',
        variables: {
          definitions: JSON.stringify(resolvedList.slice(0, 2)),
        },
        workflow: 'RunFromAPI.flow',
        version: 'draft',
      }),
    },
  );
  await response.json();
};

getEndpoints();
