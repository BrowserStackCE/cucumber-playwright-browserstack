'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the bstackdemo home page', async function () {
  await this.page.goto('https://bstackdemo.com/');
  await this.page.waitForLoadState('networkidle');
});

Then('I should see the page title {string}', async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toContain(expectedTitle);
});

When('I select the vendor {string} from the filter', async function (vendor) {
  const vendorLabel = this.page.locator('.filters-available-size', { hasText: vendor });
  await vendorLabel.waitFor();
  await vendorLabel.click();
  await this.page.waitForTimeout(1000);
});

Then(
  'all products should contain {string} or {string}',
  async function (term1, term2) {
    const products = this.page.locator('.shelf-item__title');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await products.nth(i).textContent();
      const matches = text.includes(term1) || text.includes(term2);
      expect(matches).toBe(true);
    }
  }
);

When('I click on {string} in the navigation', async function (linkText) {
  await this.page.getByText(linkText, { exact: true }).click();
  await this.page.waitForLoadState('networkidle');
});

Then('I should see the sign in page', async function () {
  await this.page.waitForSelector('#username', { timeout: 10000 });
  const usernameField = this.page.locator('#username');
  await expect(usernameField).toBeVisible();
});
