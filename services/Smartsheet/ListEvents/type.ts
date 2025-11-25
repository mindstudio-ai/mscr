export interface ListEventsInputs {
  since?: string;
  streamPosition?: string;
  to?: string;
  maxCount?: number;
  numericDates?: boolean;
  managedPlanId?: number;
  outputVariable: string;
}
