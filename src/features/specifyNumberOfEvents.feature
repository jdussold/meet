Feature: Specify number of events

 Scenario: When user hasn't specified a number, 32 is the default number
 Given user hasn't specified the number of events
 When the user opens the events page for given city
 Then the user should see 32 events

 Scenario: User can change the number of events they want to see
 Given the events page is open
 When the user change the number of events
 Then the user should see exact number of events they required