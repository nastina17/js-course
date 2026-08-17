# Playwright TypeScript

This repository contains automated tests written with Playwright and TypeScript during the JS Course.

# Installation

git clone https://github.com/nastina17/js-course
cd js-course
npm install
npx playwright install

# Test Structure

The tests are located in the `tests` directory.

Unit 10 contains an automated test which verifies successful navigation to the account page, page title is "My Account" and username "Jane Doe" appears in the navigation bar.

# Running Tests

npx playwright test
npx playwright test --headed
npx playwright test --project=chromium

To run login test with valid credentials:
npm run test:unit10

# Debugging Tests

npx playwright test --debug

# Test Report

npx playwright show-report
