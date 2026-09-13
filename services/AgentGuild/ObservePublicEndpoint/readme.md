# Observe Public Endpoint

Use this optional action when a workflow is considering a new public counterparty endpoint. Supply the exact public HTTP or HTTPS DNS URL and a simple output variable such as `endpointEvidence`. It does not intercept, authorize or bind a later workflow action.

Agent Guild receives the selected URL and probes that endpoint through its free `/preflight` route. This connector sends one request to `https://agent-guild-5d5r.onrender.com`, with no Guild API key, account, payment or registration. MindStudio still receives the action inputs and may meter platform execution; this is not a claim that the whole workflow is free. An empty service configuration does not establish hosted connection onboarding.

Only use public URLs with no secrets in their path or query. No history, other tool arguments, cookies or credentials are forwarded. The handler rejects additional input properties, URL credentials, fragments, local-looking names and IP literals. It supports DNS hostnames only. Lexical screening cannot prove DNS resolves publicly; it does not enforce Guild's subsequent network resolution. The caller must select an authorized public endpoint.

The output contains `status: observed`, exact `target`, local `requestedAt`/`completedAt` times, response size, and all six service-reported check statuses. Each remains `proven`, `failed` or `unknown`, with consistent `failed`/`unknowns` lists and verdict. Failure of reachability or protocol handshake gives `do_not_delegate`; other failures give `delegate_with_caution`; no failed check gives `no_failed_checks` even when some checks are unknown.

These are endpoint observations, not proof of task competence, safe data handling or independent ownership. Card-signature presence is not cryptographic card verification. A payment-claim observation is not settlement. Exact response target equality does not bind later execution to that URL. Remote prose is not forwarded as instructions.

Malformed, mismatched, contradictory or excessive responses yield `status: rejected` and a stable error code. HTTP and transport failures yield `status: unavailable`; neither implies a successful check. Negative outputs include `verified: false`. An invalid output variable throws before any network request because no safe result destination exists. Output names must match a simple identifier, at most 64 characters, and cannot be `__proto__`, `constructor` or `prototype`.

Limits: 2,048 URL characters, 64 KiB decoded response body, one request, no redirects or retries, and a 15-second fetch/body-read deadline. The handler requests cancellation and returns a timeout if that deadline expires. This does not prove that DNS, remote work or a framework's worker has stopped; a host ignoring cancellation may continue underlying work. No enrollment, paid operation, delegation or workflow-wide cancellation occurs.

Source tests use the actual MSCR test harness and compiled handler with HTTP substituted. They do not establish hosted onboarding, icon rendering or independent adoption. The included `icon.svg` is original neutral artwork; managed hosting of its relative path remains a maintainer integration detail.
