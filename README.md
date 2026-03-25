# cucumber-playwright-browserstack

Cucumber.js + Playwright integration with BrowserStack for E2E functional testing, using the `browserstack-node-sdk`.

## Project Structure

```
├── browserstack.yml              # BrowserStack configuration (platforms, credentials, etc.)
├── cucumber.js                   # Cucumber runner configuration
├── features/
│   ├── search.feature            # Product search & vendor filtering scenarios
│   ├── cart.feature              # Add-to-cart scenario
│   ├── local.feature             # BrowserStack Local tunnel test
│   ├── step_definitions/
│   │   ├── search-steps.js       # Step definitions for search scenarios
│   │   ├── cart-steps.js         # Step definitions for cart scenarios
│   │   └── local-steps.js        # Step definitions for local testing
│   └── support/
│       ├── world.js              # Custom World: Playwright browser lifecycle
│       └── hooks.js              # Before/After hooks (browser setup, screenshot on failure)
├── package.json
└── README.md
```

## Setup

1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd cucumber-playwright-browserstack
npm install
```

2. Set your BrowserStack credentials as environment variables:

```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

Or update `userName` and `accessKey` in `browserstack.yml`.

## Running Tests

### Run search tests on BrowserStack

Runs `search.feature` against [bstackdemo.com](https://bstackdemo.com/) across all platforms defined in `browserstack.yml`:

```bash
npm run sample-test
```

### Run local tests on BrowserStack

Verifies that the BrowserStack Local tunnel is working:

```bash
npm run sample-local-test
```

### Run all tests on BrowserStack

Runs every feature file (search, cart, local) across all platforms:

```bash
npm run sample-all-test
```

### Run tests locally (without BrowserStack)

Runs the Cucumber tests directly using a local Playwright browser:

```bash
npm test
```

## How It Works

- **Cucumber.js** provides the BDD layer with Gherkin feature files and step definitions.
- **Playwright** handles browser automation (navigation, clicks, assertions) via `chromium.launch()`.
- **BrowserStack SDK** (`browserstack-node-sdk`) wraps the Cucumber runner and intercepts Playwright's browser launch. It routes execution to BrowserStack, managing platform distribution, parallel execution, Local tunneling, and test reporting — all configured through `browserstack.yml`.

## Configuration

### Platforms

Edit the `platforms` section in `browserstack.yml` to change which browsers and OS combinations to test on. The default configuration runs on:

| OS          | Browser             |
|-------------|---------------------|
| Windows 11  | Chrome (latest)     |
| macOS Ventura | WebKit (latest)   |
| Windows 11  | Firefox (latest)    |

See the [full platform list](https://www.browserstack.com/list-of-browsers-and-platforms/automate).

### Parallelism

Adjust `parallelsPerPlatform` in `browserstack.yml` to control how many parallel sessions run per platform.

### Timeouts

The default Cucumber step timeout is 60 seconds, set in `features/support/world.js` via `setDefaultTimeout()`.

## Viewing Results

- View test results on the [BrowserStack Automate Dashboard](https://automate.browserstack.com/).
- An HTML report is generated at `reports/cucumber-report.html` after each run.
