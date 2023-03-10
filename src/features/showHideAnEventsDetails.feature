Feature: Show/hide an event's details

 Scenario: An event element is collapsed by default
 Given the event's page was open
 When the user checks the page
 Then event element would be collapsed

 Scenario: User can expand an event to see its details
 Given user wanted to see event's details
 When the user clicks on an event
 Then the user should see expanded event element

 Scenario: User can collapse an event to hide its details
 Given user hasn't searched for event's details
 When the user clicks again on an event
 Then the event element should collapse