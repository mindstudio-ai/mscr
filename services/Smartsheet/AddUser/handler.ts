import smartsheet from 'smartsheet';

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
  const {
    email,
    firstName,
    lastName,
    admin,
    licensedSheetCreator,
    outputVariable,
  } = inputs;

  if (!email) {
    throw new Error('Email is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Adding user ${email}...`);

    const userSpec: any = {
      email,
    };

    if (firstName) {
      userSpec.firstName = firstName;
    }
    if (lastName) {
      userSpec.lastName = lastName;
    }
    if (admin !== undefined) {
      userSpec.admin = admin;
    }
    if (licensedSheetCreator !== undefined) {
      userSpec.licensedSheetCreator = licensedSheetCreator;
    }

    const result = await client.users.addUser({ body: userSpec });

    log(`Successfully added user: ${email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error adding user: ${error.message}`);
    throw error;
  }
};
