# Code Review Checklist

Use this as a scanning guide for thorough reviews. Not every item applies to every change.

## Correctness & Logic

- [ ] Off-by-one errors in loops, slices, or pagination (`< n` vs `<= n`, `start` vs `start+1`)
- [ ] Null/undefined dereferences — what happens when the value is absent?
- [ ] Integer overflow or underflow (especially in financial math or byte buffers)
- [ ] Wrong operator precedence (e.g., `a || b && c` when `(a || b) && c` was intended)
- [ ] Mutation of shared state that callers didn't expect
- [ ] Early returns that skip cleanup (file handles, DB transactions, locks)
- [ ] Async/await issues — unhandled promises, missing await, error swallowing
- [ ] Race conditions — two concurrent calls modifying the same data
- [ ] Wrong equality check (reference vs. value, `==` vs `===`, `is` vs `==`)

## Security

- [ ] **SQL injection** — string concatenation or f-string interpolation into queries
- [ ] **XSS** — unsanitized user input rendered as HTML (`dangerouslySetInnerHTML`, `innerHTML`)
- [ ] **Path traversal** — user-controlled strings used in file paths without sanitization
- [ ] **SSRF** — user-supplied URLs fetched server-side without allow-listing
- [ ] **Command injection** — user input passed to shell commands
- [ ] **Insecure deserialization** — untrusted data passed to `eval`, `pickle`, `yaml.load`
- [ ] **Secrets in code** — API keys, tokens, or passwords hardcoded or logged
- [ ] **Auth bypass** — missing permission check, wrong role check, or check applied after action
- [ ] **Mass assignment** — accepting untrusted input objects and spreading them onto models
- [ ] **Open redirect** — user-controlled redirect URL without validation
- [ ] **Timing attacks** — using `==` to compare secrets instead of a constant-time function

## Performance

- [ ] N+1 queries — fetching related records inside a loop
- [ ] Missing index on a column that is filtered or sorted in queries
- [ ] Unnecessary re-renders — React/Vue component recreated on every render
- [ ] Expensive work inside a hot loop (regex compilation, JSON parse, file I/O)
- [ ] Memory leak — event listeners, subscriptions, or timers not cleaned up on unmount/destroy
- [ ] Blocking the main thread — synchronous I/O, long CPU computation without yielding
- [ ] Unbounded collection growth — appending to a list in an infinite loop or polling function

## API & Interface Design

- [ ] Breaking changes to a public API or contract (params removed, types narrowed, errors changed)
- [ ] New required parameters that break existing callers
- [ ] Return type changed without updating all call sites
- [ ] Events or callbacks that fire in a different order than callers expect

## Error Handling

- [ ] Errors silently swallowed with an empty `catch` block
- [ ] Generic error message that hides the root cause from operators
- [ ] Error path that leaves state in a partially-updated, inconsistent form
- [ ] HTTP error codes returned incorrectly (200 on failure, 500 instead of 400)

## Concurrency

- [ ] Non-atomic read-modify-write on shared state without a lock
- [ ] Deadlock risk — two locks acquired in opposite orders in different paths
- [ ] Goroutine / thread leak — spawned but never joined or cancelled

## Frontend-Specific (React/Vue/etc.)

- [ ] `key` prop missing or using array index on a dynamic list
- [ ] `useEffect` missing a dependency that causes stale closure bugs
- [ ] State update after component unmount (leads to memory leak warnings)
- [ ] Direct DOM mutation bypassing the framework's reconciliation
- [ ] Form inputs without controlled value or `onChange` handler (uncontrolled drift)
- [ ] `useCallback`/`useMemo` applied without a real perf need (premature optimization adds complexity)
