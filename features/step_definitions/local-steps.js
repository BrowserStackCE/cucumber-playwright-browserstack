'use strict';

const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I open the BrowserStack Local page', async function () {
  await this.page.goto('http://bs-local.com:45454/');
});

Then(
  'I should see the title containing {string}',
  async function (expectedText) {
    const title = await this.page.title();
    expect(title).toContain(expectedText);
  }
);
