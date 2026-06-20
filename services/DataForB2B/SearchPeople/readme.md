# DataForB2B — Search People

Search professional (LinkedIn) profiles in the DataForB2B database using structured B2B filters. Use it to find decision-makers and build prospect lists by job title, skills, employer, industry, company size, funding stage, investor, location and years of experience.

## Person Filters
- **Job Titles**: current job titles, comma-separated (e.g. `head of growth, marketing manager`).
- **Keywords**: free-text match against the profile headline (e.g. `AI, outbound`).
- **Person Location**: where the person is based (e.g. `San Francisco Bay Area, Paris`).
- **Skills**: skills listed on the profile (e.g. `kubernetes, terraform`).
- **School**: school or university attended.

## Company Filters
- **Company Names**: current employer names.
- **Company Industry**: capitalized industry (e.g. `Computer Software`).
- **Company Size**: head-count band — `2-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10001+`.
- **Funding Stage**: e.g. `seed_round, series_a, series_b, series_c, private_equity_round`.
- **Investor**: investor in the current company (e.g. `Y Combinator`).

## Experience
- **Years of Experience (Min/Max)**: total years range.
- **Currently Employed**: Yes / No / Any.

## Options
- **Match Logic**: combine filters with AND (all) or OR (any).
- **Results Count**: 1–1000 (default 25).
- **Offset**: skip N results for pagination.
- **Fetch Live Data**: leave **No** unless you explicitly need fresh live data — it is slower and costs more.

## Output
Returns `total`, `count` and a `results` array of matching people with role, company and profile data.

## Notes
- A multi-value field (comma-separated) is matched with an exact `in`; a single value uses a forgiving `like` (contains).
- If a search returns few or no results, resolve the exact stored value with the **Typeahead** connector first (industry, title, skill, company, school, investor, location).
- This connector consumes credits from your DataForB2B account.
