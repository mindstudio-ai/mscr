export interface GetProofInputs {
  sheetId: number;
  proofId: string;
  include?: "attachments" | "discussions" | undefined;
  outputVariable: string;
}
