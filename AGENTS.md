## Learned User Preferences

- Prefer simpler implementations over complex abstractions.
- When debugging/fixing, try the user's existing implementation first before proposing alternatives.

## Learned Workspace Facts

- Workspace uses Playwright + TypeScript end-to-end tests.
- Test specs live under `src/tests` and run from `playwright.config.ts`.
- Page objects are functional factories in `src/pages/**` and should expose locators/builders, not full business flows.
- Route constants are centralized in `src/constants/routes.ts`.
- Main test scripts are driven through `package.json` (`test`, `test:sanity`, `test:nightly`, `type-check`, quality checks).
