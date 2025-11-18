export interface ShareSightInputs {
  sightId: string;
  sendEmail?: boolean;
  accessApiLevel?: number;
  id?: any;
  groupId?: any;
  userId?: any;
  type?: any;
  accessLevel?: any;
  ccMe?: any;
  createdAt?: any;
  email?: any;
  message?: any;
  modifiedAt?: any;
  name?: any;
  scope?: any;
  subject?: any;
  outputVariable: string;
}

export interface ShareSightQueryParameters {
  sendEmail?: boolean;
  accessApiLevel?: number;
}
