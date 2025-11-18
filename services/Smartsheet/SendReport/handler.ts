import { SendReportInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SendReportInputs>) => {
  const {
    reportId,
    format,
    formatdetails,
    ccme,
    message,
    sendto,
    email,
    emailValue,
    subject,
    outputVariable,
  } = inputs;
  if (!reportId) {
    throw new Error('reportId is required');
  }
  const path = `/reports/${reportId}/emails`;
  const body: Record<string, any> = {};
  if (format !== undefined) {
    body['format'] = format;
  }
  if (formatdetails !== undefined) {
    body['formatDetails'] = formatdetails;
  }
  if (ccme !== undefined) {
    body['ccMe'] = ccme;
  }
  if (message !== undefined) {
    body['message'] = message;
  }
  if (sendto !== undefined) {
    body['sendTo'] = sendto;
  }
  if (email !== undefined) {
    body['email'] = email;
  }
  if (emailValue !== undefined) {
    body['email'] = emailValue;
  }
  if (subject !== undefined) {
    body['subject'] = subject;
  }

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
