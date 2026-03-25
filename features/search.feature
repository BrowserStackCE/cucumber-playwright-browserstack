Feature: BrowserStack Demo Search

  Scenario: Can find and interact with products on BStackDemo
    Given I am on the bstackdemo home page
    Then I should see the page title "StackDemo"
    When I select the vendor "Apple" from the filter
    Then all products should contain "iPhone" or "iPad"

  Scenario: Can navigate to the orders page
    Given I am on the bstackdemo home page
    When I click on "Orders" in the navigation
    Then I should see the sign in page
