import { UpdateUserProfileImageInputs } from './type';
import { IHandlerContext } from '../type';
import { ApiRequestOptions, smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateUserProfileImageInputs>) => {
  const {
    userId,
    attachmentsubtype,
    attachmenttype,
    description,
    name,
    url,
    outputVariable,
  } = inputs;
  if (!userId) {
    throw new Error('userId is required');
  }
  const path = `/users/${userId}/profileimage`;
  const body: Record<string, any> = {};
  if (attachmentsubtype !== undefined) {
    body['attachmentSubType'] = attachmentsubtype;
  }
  if (attachmenttype !== undefined) {
    body['attachmentType'] = attachmenttype;
  }
  if (description !== undefined) {
    body['description'] = description;
  }
  if (name !== undefined) {
    body['name'] = name;
  }
  if (url !== undefined) {
    body['url'] = url;
  }

  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    path,
  };
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
