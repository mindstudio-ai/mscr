export interface AddAttachmentToSheetInputs {
  sheetId: string;
  attachmentType: "LINK" | "BOXCOM" | "DROPBOX" | "EGNYTE" | "EVERNOTE" | "GOOGLEDRIVE" | "ONEDRIVE";
  description?: string;
  name?: string;
  url?: string;
  attachmentSubType?:
  "DOCUMENT" |
  "DRAWING" |
  "FOLDER" |
  "PDF" |
  "PRESENTATION" |
  "SPREADSHEET";
  outputVariable: string;
}
