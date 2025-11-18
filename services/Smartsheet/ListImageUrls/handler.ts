import { ListImageUrlsInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListImageUrlsInputs>) => {
  const {
    imageid,
    error,
    refid,
    errorcode,
    message,
    height,
    url,
    width,
    imageidValue,
    errorValue,
    refidValue,
    errorcodeValue,
    messageValue,
    heightValue,
    urlValue,
    widthValue,
    outputVariable,
  } = inputs;
  const path = `/imageurls`;
  const body: Record<string, any> = {};
  if (imageid !== undefined) {
    body['imageId'] = imageid;
  }
  if (error !== undefined) {
    body['error'] = error;
  }
  if (refid !== undefined) {
    body['refId'] = refid;
  }
  if (errorcode !== undefined) {
    body['errorCode'] = errorcode;
  }
  if (message !== undefined) {
    body['message'] = message;
  }
  if (height !== undefined) {
    body['height'] = height;
  }
  if (url !== undefined) {
    body['url'] = url;
  }
  if (width !== undefined) {
    body['width'] = width;
  }
  if (imageidValue !== undefined) {
    body['imageId'] = imageidValue;
  }
  if (errorValue !== undefined) {
    body['error'] = errorValue;
  }
  if (refidValue !== undefined) {
    body['refId'] = refidValue;
  }
  if (errorcodeValue !== undefined) {
    body['errorCode'] = errorcodeValue;
  }
  if (messageValue !== undefined) {
    body['message'] = messageValue;
  }
  if (heightValue !== undefined) {
    body['height'] = heightValue;
  }
  if (urlValue !== undefined) {
    body['url'] = urlValue;
  }
  if (widthValue !== undefined) {
    body['width'] = widthValue;
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
