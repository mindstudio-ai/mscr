export interface UpdateSightInputs {
  sightId: string;
  numericDates?: boolean;
  name?: any;
  outputVariable: string;
}

export interface UpdateSightQueryParameters {
  numericDates?: boolean;
}
