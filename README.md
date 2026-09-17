# Metodo Vicon Playwright E2E Testing Suite

Modern, robust End-to-End (E2E) testing framework for [Metodo Vicon](https://dev.metodovicon.com) using Playwright, TypeScript, and the Page Object Model (POM) pattern.

## Features

- **TypeScript Native**: Full autocomplete, strict typing, and Playwright Test fixtures.
- **Page Object Model (POM)**: Separation of concerns with dedicated page classes (`LandingPage`, `LoginPage`, `LearnPage`).
- **Vue Reactivity Handling**: Uses sequential typing for `v-model` form elements to accurately trigger validation and button enablement states.
- **Cross-Browser Testing**: Configured for Chromium, Firefox, and WebKit.
- **Reporting & Tracing**: Automatic HTML reports, traces on first retry, and failure screenshots.

## Project Structure

```
├── src/
│   ├── pages/
│   │   ├── BasePage.ts        # Common base page, cookie consent handler & navigation
│   │   ├── LandingPage.ts     # Public homepage locators & navigation
│   │   ├── LoginPage.ts       # Authentication form switching, input handling & validation
│   │   └── LearnPage.ts       # Authenticated dashboard, levels map & user profile
│   └── fixtures/
│       └── testFixture.ts     # Custom Playwright test fixture providing page instances
├── tests/
│   └── e2e/
│       ├── smoke.spec.ts      # Sanity and header navigation tests
│       ├── auth.spec.ts       # Form toggle, button state, and negative authentication
│       └── learn.spec.ts      # Protected route validation & full authenticated journey
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── .env.example               # Environment variables template
└── package.json               # Test execution scripts and dependencies
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Optionally set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` to run authenticated user journeys.

## Running Tests

| Command | Description |
|---|---|
| `npm run test:smoke` | Run smoke tests against landing page |
| `npm run test:auth` | Run authentication tests (form toggle, validation, error messages) |
| `npm run test:learn` | Run protected route and dashboard journeys |
| `npm test` | Run all E2E tests across configured browsers |
| `npm run test:headed` | Run tests in headed browser mode |
| `npm run test:ui` | Open interactive Playwright UI mode |
| `npm run report` | Open the HTML test execution report |
