export interface AddCommentAttachmentInputs {
  sheetId: string;
  commentId: string;
  attachmentSubType: "SPREADSHEET" | "DOCUMENT" | "DRAWING" | "FOLDER" | "PDF" | "PRESENTATION";
  attachmentType: "LINK" | "BOXCOM" | "DROPBOX" | "EGNYTE" | "EVERNOTE" | "GOOGLEDRIVE" | "ONEDRIVE";
  description?: string;
  name: string;
  url: string;
  outputVariable: string;
}
