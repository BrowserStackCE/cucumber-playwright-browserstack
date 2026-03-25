'use strict';

const { Before, After, Status } = require('@cucumber/cucumber');

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.closeBrowser();
});
