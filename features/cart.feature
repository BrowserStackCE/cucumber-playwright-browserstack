Feature: BrowserStack Demo Cart

  Scenario: Can add a product to the cart
    Given I am on the bstackdemo home page
    When I add the first product to the cart
    Then I should see the cart badge showing "1"
    And I should see the product in the cart sidebar
