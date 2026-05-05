# AI Coding Agent Guide

Purpose: Make agents productive fast on Playwright + TS tests: repo layout, run, extend safely.

## Project Shape (big picture)

- Stack: Playwright + TS, functional page-factory style.
- Layers: `pages/` (locator factories), `tests/` (specs), `constants/` (routes).
- Playwright runs from `src` (`playwright.config.ts`); specs under `src/tests`.

## How Things Work

- Page factories export e.g. `mainPage(page)` from `kebab-case.page.ts`; close over `page`; return locators + param locator builders only. No classes.
- Locators live in page factories only. No `src/locators/**` layer.
- `ROUTES` in `src/constants/routes.ts`; `playwright.config.ts` has `use.baseURL` — navigate e.g. `page.goto(ROUTES.home)`.
- Specs: `test` / `expect` from `@playwright/test`; factories from `{page}` fixture, local instantiation.
- Specs own nav, clicks, waits, URL + content assertions. Helpers stay in spec file so scenario visible when debugging.
- Shared fixtures: real `src/fixtures/base-test-fixture.ts` with `base.extend(...)`; no passthrough wrappers that only re-export Playwright.
- Playwright: retries CI only; traces/videos/screenshots on failure.

## Conventions That Matter

- Export `camelCasePage(page)` or `camelCaseComponent(page)` from `kebab-case.page.ts` / `kebab-case.component.ts` in `src/pages/**`.
- Page API: reusable `Locator`s + param builders only. No business flows or assertions inside factories.
- One page factory per `*.page.ts`; no multi-page shared `.page` module.
- Page-specific helper data, lookup, locator builders inside page fn, not module scope.
- Prefer direct keyed access / locator builders over small helpers that add ceremony without real gain.
- Routing: `ROUTES` from `src/constants/routes.ts`, no hardcoded URLs.
- Tests: `src/tests/**`, `.spec.ts`, factories in test or `beforeEach`.
- No `test.step(...)` around page-factory code; scenario stays in spec.
- Tags: `@sanity` / `@nightly` in describe titles for targeted runs (commands below).
- TS type-check enforced in CI + pre-commit.
- Locators: role/test-id first; CSS when role targeting impractical.

## Typical Addition (minimal example)

```ts
// src/pages/main-content/main.page.ts
import type {Page} from '@playwright/test'

export const mainPage = (page: Page) => ({
	acceptCookiesButton: page.getByRole('button', {name: 'הבנתי!'}),
	allFactsLink: page.getByRole('link', {name: 'לכל העובדות'}),
})

// src/tests/main.spec.ts
import {expect, test} from '@playwright/test'
import {ROUTES} from '../constants/routes'
import {mainPage} from '../pages/main-content/main.page'

test.describe('Main Page @sanity', () => {
	test('loads and shows content', async ({page}) => {
		const main = mainPage(page)
		await page.goto(ROUTES.home)
		await main.acceptCookiesButton.click()
		await expect(main.acceptCookiesButton).not.toBeVisible()
		await expect(main.allFactsLink).toBeVisible()
	})
})
```

## Run, Debug, Quality

- Install: `npm install && npx playwright install`
- All tests: `npm test` (local Playwright, no Docker)
- Sanity: `npm run test:sanity` (`TEST_TAGS='@sanity'`)
- Nightly: `npm run test:nightly` (`TEST_TAGS='@nightly'`)
- Report: `npm run report`
- Type-check: `npm run type-check`
- Quality: `npm run quality:check`, `npm run quality:fix`

Notes

- **Local**: test commands without Docker on host.
- **CI**: tests only in Docker (`docker compose build` then `docker compose run --rm test-runner npm run test:sanity` or `npm run test:nightly`).
- Retries CI only (`playwright.config.ts`).
- Role locators in page/component factories; no inline CSS/XPath in specs.
- Factories = locators; Playwright actions, waits, assertions in specs.
- Reusable UI region → component factory under `src/pages/components/**`.

## URLs

- Define `ROUTES` in `src/constants/routes.ts`.
- Specs: import from `../../constants/routes`, navigate with route constants (e.g. `await page.goto(ROUTES.home)`).

Reference Files

- `src/constants/routes.ts` — route constants
- `playwright.config.ts` — test dir, reporters, retries, tags
- `package.json` — scripts for test/quality