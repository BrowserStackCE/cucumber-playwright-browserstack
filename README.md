# cucumber-playwright-browserstack

Cucumber.js + Playwright integration with BrowserStack for E2E functional testing, using the `browserstack-node-sdk`.

## Project Structure

```
├── browserstack.yml              # BrowserStack configuration (platforms, credentials, etc.)
├── cucumber.js                   # Cucumber configuration
├── features/
│   ├── search.feature            # Sample product search / navigation tests
│   ├── cart.feature              # Sample add-to-cart test
│   ├── local.feature             # BrowserStack Local tunnel test
│   ├── step_definitions/
│   │   ├── search-steps.js       # Step definitions for search scenarios
│   │   ├── cart-steps.js         # Step definitions for cart scenarios
│   │   └── local-steps.js        # Step definitions for local testing
│   └── support/
│       ├── world.js              # Custom World: Playwright browser lifecycle + BrowserStack CDP
│       └── hooks.js              # Before/After hooks (browser setup, screenshot on failure)
├── package.json
└── README.md
```

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Set your BrowserStack credentials as environment variables:

```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

Or update `userName` and `accessKey` in `browserstack.yml`.

## Running Tests

### Run sample tests on BrowserStack

Runs the search and product features against [bstackdemo.com](https://bstackdemo.com/) on the platforms defined in `browserstack.yml`:

```bash
npm run sample-test
```

### Run local tests on BrowserStack

Verifies that the BrowserStack Local tunnel is working:

```bash
npm run sample-local-test
```

### Run tests locally (without BrowserStack)

If you want to run the Cucumber tests directly (connects to BrowserStack CDP by default — you can modify `world.js` to launch a local browser instead):

```bash
npm test
```

## How It Works

- **Cucumber.js** provides the BDD test structure with Gherkin feature files.
- **Playwright** handles all browser automation (navigation, clicks, assertions).
- **BrowserStack SDK** (`browserstack-node-sdk`) wraps the Cucumber runner to manage platform distribution, parallel execution, BrowserStack Local tunneling, and test reporting.
- The custom `World` class in `features/support/world.js` connects Playwright to BrowserStack via the CDP WebSocket endpoint (`wss://cdp.browserstack.com/playwright`).

## Configuration

### Platforms

Edit `browserstack.yml` to change which browsers / OS combinations to test on. See the [full platform list](https://www.browserstack.com/list-of-browsers-and-platforms/automate).

### Timeouts

The default Cucumber timeout is set to 60 seconds in `features/support/world.js`. Adjust via `setDefaultTimeout()`.

## Viewing Results

- View test results on the [BrowserStack Automate Dashboard](https://automate.browserstack.com/).
- An HTML report is generated at `reports/cucumber-report.html` after each run.
