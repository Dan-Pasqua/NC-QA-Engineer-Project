# NC-QA-Engineer-Project
To fulfill the requirements of the challenge, I chose to use Cypress because of its ability to run in the browser and its speed.

Using a Macbook Pro, my installation steps were: 
  1. Install NVM
  2. Install Node.js
  3. Install Cypress

To fulfill User Story #2, I installed Chrome, Edge and Firefox, which enabled me to switch between browsers within the Cypress UI. I also added browser-specific commands in package.json so that tests can be run in the terminal. Cypress has experimental support for WebKit to run tests in Safari. For this challenge, I chose not to use WebKit because of its experimental nature; Cypress has a list of known issues and differences in functionality listed on its site: https://docs.cypress.io/guides/guides/launching-browsers?ref=cypress-io.ghost.io#WebKit-Experimental.

Throughout the testing process I found the following bugs:
  1. The calendar does not default to the following month. It defaults to the current month.
  2. If the user attempts to book a trip without filling out the contact information form, the error messages do not appear in the same order twice.
  3. An addition to #2 -- Only the Firstname and Lastname inputs are identified in the error messages; none of the other messages identify which requirements apply to the specific input. I would count this as a separate bug because this bug deals with content while #2 deals with functionality.
  4. The booking functionality does not adhere to the two night minimum. I found this bug during manual testing.
  5. The user can book dates in the past. I found this bug during manual testing.

Because of bugs 2 and 3, I could only verify that the alert box was visible. Had the error list remained static with the requirements properly attributed to their inputs, I would've created a fixture file to quickly iterate through each input and its requirements.

One of Cypress's shortcomings is dragging and dropping, which made selecting dates rather difficult. I tried to avoid using a plugin, but I ended up installing the cypress-drag-drop plugin. It completed the task to a degree; the tool selects dates, but there is no reason, that I found anyway, to why the :nth-child() does not work if the To date is under 15. When it's successful, it takes up a good chunk of the calendar, which can make multiple bookings difficult. Because of that setback, I used the Cypress retry functionality to fulfill User Story 8. 

Most modern calendars include a dropdown date picker and an writeable input fields for the To and From dates. Working with a better calendar setup would be much simpler, and I'd be able to test the date picker as well as typing dates into the inputs. Doing this would allow me to eliminate the need for retries, which would also enhance the test's performance.

While writing my tests, I thought of a few additional testing scenarios:
  1. Bug #5 was the result of a negative manual test
  2. Attempting to book multiple non-consecutive days
  3. Booking multiple rooms for the same days
  4. Addressing the casing of some of the room titles
  5. Add accessibility tests using Pa11y and aXe

I hope I completed this challenge to your expectations and that I have the opportunity to move forward in the interview process. Thank you for this opportunity; this assignment was a fun challenge, and I enjoyed trying to figure out how I'd do things with more time.

Thanks again,

Dan
