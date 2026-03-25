Feature: BrowserStack Local Testing

  Scenario: BStack Local tunnel is working
    Given I open the BrowserStack Local page
    Then I should see the title containing "BrowserStack Local"
