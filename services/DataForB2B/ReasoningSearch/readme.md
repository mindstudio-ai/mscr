# DataForB2B — Reasoning Search

Natural-language B2B search. Describe the people or companies you want in plain English and a DataForB2B AI agent builds and runs the optimal filters for you — no need to know exact column names or values.

## Configuration
- **Search Query** *(required)*: plain-language description (max 3000 chars), e.g. `heads of growth at seed-stage fintech startups in the US`.
- **Search Type**: People or Companies (default People).
- **Max Results**: 1–100 (default 25).

## Advanced
- **Session ID**: pass the `session_id` from a previous run to refine that search.
- **Fetch Live Data**: leave **No** unless you explicitly need fresh data.

## Output
Returns `status`, `session_id`, `total`, `count` and a `results` array.

If `status` is `needs_input`, the agent needs more detail — add specifics to your Search Query and run again. Clarification turns are free.

## Tip — pagination
Reasoning Search returns only the first page. To page deeper, take the `applied_filters` from the response and call **Search People** / **Search Companies** with an `offset` (25, 50, …).

## Notes
- This connector consumes credits from your DataForB2B account.
