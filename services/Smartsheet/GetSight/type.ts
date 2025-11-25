export interface GetSightInputs {
  sightId: string;
  accessApiLevel?: number;
  include?: string;
  level?: number;
  numericDates?: boolean;
  outputVariable: string;
}
