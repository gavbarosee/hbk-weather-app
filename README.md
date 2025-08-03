# Weather Alerts Dashboard

A responsive web app built with React and Typescript for browsing and filtering weather alerts from the National Weather Service API.

## Quick Start

**Requirements:**

Ensure you have Node 20+ (Node `23.6.0` ideal) installed, ideally with `nvm`:

- Node.js 20+
- npm 10+

**Installation:**

Pull the repository locally, and change into it:

```bash
cd hbk-weather-app
```

Then run:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Testing

Run the test suite with:

```bash
npm test
```

## Demo

**Live Demo:**

You can explore a live demo of the app here https://nws-weather-alerts-app.netlify.app

**Screenshots:**

Filters interface:

  <img width="1629" height="834" alt="Screenshot 2025-08-03 at 17 39 16" src="https://github.com/user-attachments/assets/44880878-ef7b-4af9-8b12-205f068781dd" /> 


Main alerts table:

  <img width="1458" height="787" alt="Screenshot 2025-08-03 at 17 40 50" src="https://github.com/user-attachments/assets/3e34a560-a07e-4498-851b-10b917b87f48" />


Alert details view:

  <img width="1464" height="821" alt="Screenshot 2025-08-03 at 17 41 36" src="https://github.com/user-attachments/assets/bb913ea7-cc7c-48a0-acd3-c3f9f13a14aa" />
  <img width="1473" height="820" alt="Screenshot 2025-08-03 at 17 42 09" src="https://github.com/user-attachments/assets/0ea8c755-0688-417c-a3a0-8c02222a4b79" />
  <img width="1370" height="813" alt="Screenshot 2025-08-03 at 17 42 27" src="https://github.com/user-attachments/assets/c978d556-8ca4-4ace-9cd6-448dc27ae279" />


## Features

The app meets all the requirements from the specification, but its worth mentioning the full list of features:

- **Smart Filtering:** Filter alerts by date range (with presets available), severity, event type, and search text
- **Efficient Data Handling:** No redundant API calls, alert details use cached data
- **Responsive Table:** Sortable columns with pagination controls positioned for easy access
- **Responsive UI:** Designed for mobile, tablet and desktop
- **Detail Views:** Comprehensive alert information with both technical and general details
- **Clean UX:** Clearable inputs throughout for better user experience, inputs neatly organized, preset date ranges, pagination controls at the top of the table, local timezone display
- **Background Updates:** Automatic data refresh every 5 minutes plus on window focus, without disrupting the UI

## Architecture

Overall, I've built the app with modern React patterns:

- React Query for data fetching and caching
- Custom hooks for clean separation of concerns
- Error boundaries for isolated error handling
- TypeScript for type safety
- Material-UI for consistent design
- Vitest for testing

## Development

For code quality I've setup the following:

- ESLint and Prettier for consistent formatting
- Pre-commit hooks ensure tests pass and that the code style is right before commits
- Comprehensive test coverage for core components

## Potential Improvements

Those are some improvements I'd add in a production setting if I had more time:

- E2E testing with Playwright
- Table density options for different user preferences
- Virtual scrolling for large datasets
- Enhanced search with fuzzy matching ideally with a robust yet lightweight library
- Semantic HTML improvements
- Keyboard navigation for inputs, depending on the type of user who'd use this app
- Cross-IDE editor configuration
- Bundle analysis and tree-shaking optimization
- React re-render profiling and optimization (i.e why-did-you-render with React Profiler)
- Lighthouse performance auditing
- Code splitting for route-based lazy loading
- Core Web Vitals monitoring
