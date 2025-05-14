Feature: Login functionality

@smoke @positiveLogin
  Scenario: login page with valid username and password
    Given providing valid url for login
    When providing valid username as "Admin" and password as "admin123"
    Then clicking login button
    And user should be redirected to the dashboard


@smoke @negativeLogin
  Scenario: Login with empty credentials
    Given I open the login page
    When clicking login button
    Then I should see required field error messages
