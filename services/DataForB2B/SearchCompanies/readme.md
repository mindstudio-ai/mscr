# DataForB2B — Search Companies

Search companies in the DataForB2B database with firmographic filters. Ideal for building an ICP target-account list before finding decision-makers (use **Search People** next to find contacts at the matched companies).

## Company Filters
- **Company Names**: company names, comma-separated.
- **Keywords**: free-text match against name, tagline and description.
- **Industry**: lowercase industry (e.g. `software development, it services and it consulting`).
- **Category**: lowercase category (e.g. `software, fintech, e-commerce`).

## Location & Size
- **Employee Size**: head-count band — `1-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10001+`.
- **Country**: HQ country as ISO-2 uppercase (e.g. `US, GB, FR`). Use `GB` not `UK`.
- **City** / **Region**: HQ city and region/state.

## Funding & Metadata
- **Founded Year (Min/Max)**: founding year range.
- **Has Funding**: Yes / No / Any.
- **Funding Stage**: e.g. `seed_round, series_a, series_b, private_equity_round`.

## Options
- **Match Logic**: AND (all) or OR (any).
- **Results Count**: 1–1000 (default 25).
- **Offset**: skip N results for pagination.
- **Fetch Live Data**: leave **No** unless you explicitly need fresh data.

## Output
Returns `total`, `count` and a `results` array of matching companies with firmographic data.

## Notes
- Multi-value fields (comma-separated) match with an exact `in`; a single value uses a forgiving `like` (contains).
- If a search returns few or no results, resolve the exact stored value with the **Typeahead** connector first.
- This connector consumes credits from your DataForB2B account.
