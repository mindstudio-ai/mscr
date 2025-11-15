export interface ListEventsInputs {
  since?: string;
  streamPosition?: string;
  outputVariable: string;
}

export interface ListEventsQueryParameters {
  since?: string;
  streamPosition?: string;
}
