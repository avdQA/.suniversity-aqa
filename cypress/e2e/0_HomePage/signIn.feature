@smoke @regression @homePage
Feature: [#HomePage] Check the GhostDrive homepage
  Check the GhostDrive homepage

  Background: Open the GhostDrive homepage
    Given User should be on the SignInCrypto web page


  Scenario: Check the GhostDrive homepage title
    Given User should be on the Home web page
    And User should be on the Main web page and signed as owner
    # Check result
    Then In the title I see the text "Ghost Drive"


  Scenario: Check Term of Service link
    When I click on "Customer Terms of Service" link
    # Check result
    Then I should see the "/terms-of-service-fail" path in the browser's address bar
    And In the title I see the text "GhostDrive | Terms of Services"
    And I should see the "Terms and Conditions" text on the active page


  Scenario: Check Privacy Policy link
    When I click on "Privacy Policy" link
    # Check result
    Then I should see the "/privacy" path in the browser's address bar
    And In the title I see the text "GhostDrive | Policy and Privacy"
    And I should see the "Privacy Policy" text on the active page


  Scenario: Check Cookie Policy link
    When I click on "Cookie Policy" link
    # Check result
    Then I should see the "/privacy" path in the browser's address bar
    And In the title I see the text "GhostDrive | Policy and Privacy"
    And I should see the "Privacy Policy" text on the active page
