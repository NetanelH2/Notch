# E2E Starter Kit

Playwright + TypeScript E2E starter kit. Clone this project to bootstrap a new E2E test suite with UI testing, snapshot testing, API-backed fixtures, shared auth sessions, and state polling out of the box.

## Quick Start

```bash
cp .env.example .env
# Fill in AUTH_EMAIL and AUTH_PASSWORD

npm install
npx playwright install --with-deps

npm run type-check
npm run quality:check
npm test
```

## Project Structure

```text
src/
├── constants/            # Shared constants (routes, timeouts, snapshot names, test data)
├── data/                 # Static test data files (URLs, uploads)
├── data-creation/        # API layer for test data lifecycle
│   ├── base/             #   Generic API request helpers
│   ├── constants/        #   API-specific constants (timeouts, states)
│   ├── data/
│   │   ├── create-templates/   # Payloads for creating resources via API
│   │   └── fixed-data/         # Pre-seeded data for local dev (non-CI)
│   ├── fixtures/         #   Playwright fixtures (request, property, scan)
│   ├── helpers/          #   Auth token reader, state polling, file I/O
│   └── types/            #   API response types and fixture type definitions
├── fixtures/             # Base test fixture that wires everything together
├── helpers/              # Environment and auth utilities
├── pages/                # Page objects and component locators
│   ├── components/       #   Reusable component locators (header, breadcrumb)
│   ├── helpers/          #   Table sorting, column index helpers
│   └── properties/       #   Domain-specific page objects
├── setup/                # Auth setup and teardown (storage state + API token)
├── snapshots/            # Screenshot baselines (auto-generated)
├── tests/                # Test specs organized by feature
└── types/                # Shared TypeScript types
```

## Architecture

### Auth & Shared Sessions

Tests share a single authenticated session via Playwright's storage state mechanism:

1. `src/setup/auth.setup.ts` runs first (the `setup` project)
2. It performs a UI login and saves browser state to `.auth/user.json`
3. It also fetches an API bearer token and writes it to `src/setup/data/auth-token.json`
4. All test projects (`chromium`, `firefox`, `webkit`) reuse this stored auth
5. `src/setup/auth.teardown.ts` cleans up the token file after all tests complete

### Fixtures & Fixture Chain

The base test fixture (`src/fixtures/base-test-fixture.ts`) extends Playwright's `test` with API-backed fixtures that automatically create and tear down test data:

```text
request  →  property  →  scan
```

Each fixture follows the same pattern:

- **CI mode**: Create the resource via API, yield it to the test, delete it in `finally`
- **Local mode**: Use pre-seeded fixed data from `data-creation/data/fixed-data/`

The `process.env.CI = 'true'` line in `base-test-fixture.ts` forces CI mode for all specs that import it. Remove this line if you want to use fixed data locally.

Usage in tests:

```typescript
import {expect, test} from '../../fixtures/base-test-fixture'

test('uses API-created property', async ({page, property}) => {
	// `property` is auto-created before this test and deleted after
})

test('uses scan (depends on property)', async ({page, scan}) => {
	// `scan` auto-creates a property first, then a scan on top of it
})
```

### State Polling

For resources that transition through async states (e.g., NEW → RUNNING → DONE), use the `validateStateByBodyId` helper:

```typescript
import {validateStateByBodyId} from '../helpers/state-poll'

await validateStateByBodyId(request, API_ROUTES.scanController, scanBody).toBe(
	ScanStateEnum.DONE,
)
```

This uses `expect.poll()` with configurable intervals and timeout.

### Snapshot Testing

Screenshots use centralized names from `src/constants/snapshot-names.ts` and support masking dynamic regions:

```typescript
import {SNAPSHOT_NAMES} from '../../../constants/snapshot-names'

await expect(page).toHaveScreenshot(
	SNAPSHOT_NAMES.creatingProperty.addPropertyModal,
	{mask: [page.locator('[data-automation-id="timestamp"]')]},
)
```

Baselines are stored in `src/snapshots/` (auto-generated on first run with `--update-snapshots`).

### Page Objects

Page objects use a factory function pattern:

```typescript
export const myPage = (page: Page) => {
	const heading = page.getByRole('heading', {name: 'Title'})
	return {
		heading,
		goto: () => page.goto(ROUTES.myPage),
	} satisfies NavigablePage
}
```

### Parameterized Test Data

Use typed data arrays for data-driven tests:

```typescript
import {SEED_URL_VALIDATION_CASES} from '../../../constants/test-data'

for (const {url, error, description} of SEED_URL_VALIDATION_CASES) {
	test(`rejects URL that is ${description}`, async ({page}) => {
		// ...
	})
}
```

## Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `npm test`              | Run setup + chromium tests + teardown |
| `npm run test:sanity`   | Run tests tagged `@sanity`            |
| `npm run test:nightly`  | Same as `npm test` (full suite)       |
| `npm run type-check`    | TypeScript type checking              |
| `npm run quality:check` | Type check + Prettier + ESLint        |
| `npm run quality:fix`   | Auto-fix formatting and lint issues   |
| `npm run report`        | Open HTML test report                 |
| `npm run report:allure` | Open Allure report                    |

## Configuration

### Environment Variables

| Variable        | Required | Description                                                 |
| --------------- | -------- | ----------------------------------------------------------- |
| `AUTH_EMAIL`    | Yes      | Login email for the target app                              |
| `AUTH_PASSWORD` | Yes      | Login password                                              |
| `CI`            | No       | Set to `true` in CI environments (auto-set in base fixture) |
| `TEST_TAGS`     | No       | Regex for filtering tests (e.g., `@sanity`)                 |

### Playwright Config Highlights

- **`testIdAttribute`**: `data-automation-id` (matches the app's custom test IDs)
- **`snapshotPathTemplate`**: `./src/snapshots/{arg}{ext}`
- **`baseURL`**: `https://test-website.com` (change to your target app)
- **`trace`**: Always on for debugging
- **Reporters**: List, Allure, HTML, JUnit

## Adapting for a New Project

1. Update `baseURL` in `playwright.config.ts`
2. Update `AUTH_EMAIL` / `AUTH_PASSWORD` in `.env`
3. Replace page objects under `src/pages/` with your app's pages
4. Replace API routes in `src/data-creation/data/api-routes.ts`
5. Replace resource types under `src/data-creation/types/responses/`
6. Replace create templates under `src/data-creation/data/create-templates/`
7. Replace fixed data under `src/data-creation/data/fixed-data/`
8. Update `src/constants/routes.ts` with your app's UI routes
9. Update `src/constants/snapshot-names.ts` with your snapshot names
10. Write tests under `src/tests/`
