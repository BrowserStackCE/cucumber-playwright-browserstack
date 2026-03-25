'use strict';

const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let addedProductName = '';

When('I add the first product to the cart', async function () {
  await this.page.locator('.shelf-item').first().waitFor();

  addedProductName = await this.page
    .locator('.shelf-item__title')
    .first()
    .textContent();

  await this.page.locator('.shelf-item__buy-btn').first().click();
  await this.page.waitForTimeout(1000);
});

Then(
  'I should see the cart badge showing {string}',
  async function (expectedCount) {
    const badge = this.page.locator('.bag__quantity');
    await expect(badge).toHaveText(expectedCount);
  }
);

Then('I should see the product in the cart sidebar', async function () {
  const cartContent = this.page.locator('.float-cart__content');
  await cartContent.waitFor({ state: 'visible' });

  const cartProductName = await this.page
    .locator('.shelf-item__details .title')
    .first()
    .textContent();

  expect(cartProductName.trim()).toBe(addedProductName.trim());
});
