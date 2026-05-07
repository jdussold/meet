# TODO

## Tests to rewrite

Eight Enzyme-based test files were deleted during the Vite/Vitest migration
because Enzyme doesn't support React 18 and the package wasn't even installed.

**Component tests** (`src/__tests__/`):
- `App.test.js` — component composition + integration (events/locations/numberOfEvents prop wiring, city filter flow, mock-data alignment)
- `CitySearch.test.js` — input rendering, suggestion list, query filter, focus/blur behavior
- `Event.test.js` — summary/start/location rendering, expand/collapse details button
- `EventList.test.js` — renders correct number of `<Event>` per `events.length`
- `NumberOfEvents.test.js` — default 32, input change, error text on out-of-range

**jest-cucumber step definitions** (`src/features/`) — the `.feature` files
remain as documentation; rewrite the matching `.test.js` step definitions:
- `filterEventsByCity.test.js`
- `showHideAnEventsDetails.test.js`
- `specifyNumberOfEvents.test.js`

Rewrite using `@testing-library/react` (already in devDeps) + `vitest`. Use
`render`, `screen`, `userEvent` instead of `shallow`/`mount` and component-state
introspection. `jest-cucumber@4` works under Vitest unchanged.

## E2E test

`src/__tests__/EndToEnd.test.js` (Puppeteer) is `describe.skip`-ed by default
because it requires both a running dev server and `npx puppeteer browsers
install chrome`. Run on demand by removing `.skip` after starting the dev
server and installing Chrome.

## Pre-existing bugs (out of migration scope)

- `src/WelcomeScreen.jsx:26-27` — Google logo URL is split across two lines, so
  the rendered `<img src>` contains a literal newline and fails to load with
  `NS_BINDING_ABORTED`. Either inline the URL on one line or replace the
  Wikimedia hotlink with a local asset.
