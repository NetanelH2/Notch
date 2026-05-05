# Notch E2E Tests

Short guide for cloning and running tests.

## 1) Install

```bash
git clone https://github.com/notch-ai/e2e-notch.git
cd e2e-notch
npm install
npx playwright install --with-deps
```

## 2) Create auth state (one-time)

```bash
npm run auth:chrome
```

In the opened Chrome window:

- log in to Notch
- wait until you are inside the app

Then save session:

```bash
npm run auth:save
```

This creates `playwright/.auth/user.json`.

## 3) Run tests

```bash
npm test
```

## Useful commands

```bash
npm run report
```
