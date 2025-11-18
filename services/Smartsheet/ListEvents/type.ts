export interface ListEventsInputs {
  since?: string;
  to?: string;
  streamPosition?: string;
  maxCount?: number;
  numericDates?: boolean;
  managedPlanId?: number;
  outputVariable: string;
}

export interface ListEventsQueryParameters {
  since?: string;
  to?: string;
  streamPosition?: string;
  maxCount?: number;
  numericDates?: boolean;
  managedPlanId?: number;
}
