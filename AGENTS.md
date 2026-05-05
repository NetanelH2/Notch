## Learned User Preferences

- Prefer simpler implementations over complex abstractions.
- When debugging/fixing, try the user's existing implementation first before proposing alternatives.
- Prefer **role-based** Playwright locators (`getByRole`, etc.); use CSS/test-id fallbacks only when roles are missing or unreliable.

## Learned Workspace Facts

- Workspace uses Playwright + TypeScript end-to-end tests.
- Test specs live under `src/tests` and run from `playwright.config.ts`.
- Page objects are functional factories in `src/pages/**` and should expose locators/builders, not full business flows.
- Route constants are centralized in `src/constants/routes.ts` (includes `ROUTES.playground` for Notch DEV Playground).
- Main test scripts are driven through `package.json` (`test`, `type-check`, `quality:check` / `quality:fix`, `report`, `auth:chrome`, `auth:save`).
- **Notch Playground (DEV):** `Test Taylor` may open a new browser tab; tests that must stay on one `Page` should `goto` `ROUTES.playground` instead of relying on that click.
- **Playground reply composer:** often inside a nested `overflow-y` scroll panel (not `main`). Call `scrollPlaygroundComposerPanel` in `src/pages/base-page.helper.ts` before filling. Target the composer with `getByPlaceholder('Use # for macros').or(main .ql-editor[contenteditable="true"]).last()` so Quill fills in CI.
- **Thread assertions:** the same user copy can appear in the header preview and the message list—scope with `getByRole('main')` and/or `.last()` to avoid strict-mode duplicates. For `Response` from `waitForResponse`, assert `response.status()` / `ok()`, not the object vs a numeric literal.
- **Bot streaming:** wait for the loading line to disappear (e.g. “Phrasing response…”) rather than asserting a specific final assistant phrase, which varies by policy/run.
