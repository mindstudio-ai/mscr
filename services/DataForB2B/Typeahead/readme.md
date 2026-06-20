# DataForB2B — Typeahead

Autocomplete the exact stored value for any DataForB2B search filter. Use it to resolve a value before filtering so your **Search People** / **Search Companies** query matches the database — especially when a search returns few or no results.

## Configuration
- **Type** *(required)*: the category to autocomplete — Company, People Industry (capitalized), Company Industry (lowercase), Category, Location (profile), City (company), Region (company), School, Job Title, Skill, Investor.
- **Query** *(required)*: partial text to autocomplete (1–100 chars), e.g. `pyth`.
- **Limit**: max suggestions to return (1–20, default 20).

## Output
Returns a `results` array of ranked suggestions, each with a `value` (the exact stored value to use in a filter) and a `label`.

## Notes
- Results are ordered by popularity with prefix matches promoted.
