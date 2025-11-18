export interface ShareReportInputs {
  reportId: string;
  sendEmail?: boolean;
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

export interface ShareReportQueryParameters {
  sendEmail?: boolean;
}
