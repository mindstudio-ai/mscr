# DataForB2B — Enrich LinkedIn Profile

Enrich a single person from a LinkedIn profile URL or id. Returns full profile data (experience, education, skills) plus — when toggled on — verified work email, personal email, phone number and GitHub profile.

## Configuration
- **Profile Identifier** *(required)*: a full or short LinkedIn profile URL, a public id (e.g. `john-doe`), or an encoded id (`prof_...`, recommended for reliability).

## Data to Fetch
Toggle each data type. You are charged only for what you request; at least one must be on (defaults to **Full Profile**).
- **Full Profile**: experience, education, skills (default Yes).
- **Work Email**: professional / work email.
- **Personal Email**: personal email.
- **Phone Number**.
- **GitHub Profile**.

## Output
Returns the enriched person object.

## Notes
- This connector consumes credits from your DataForB2B account — emails, phone and GitHub are billed only when enabled.
