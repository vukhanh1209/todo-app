# Getting Started

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js) or yarn (https://yarnpkg.com/) or pnpm (https://pnpm.io/) or bun (https://bun.sh/)

## Installation

First, install the necessary packages:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Common Assignment

How to run test:

```bash
# Using npm
npm test

# Using yarn
yarn test

# Using pnpm
pnpm test

# Using bun
bun test
```

## Function 1: get_1_or_0

- **Description:** Returns either `1` or `0` with equal probability.
- **Tests:**
  - Verified that both `0` and `1` are generated over 1000 trials.
  - Passed all edge cases.

## Function 2: get_random

- **Description:** Generates a random integer between `0` and `n`.
- **Tests:**
  - Confirmed outputs are within the range [0, n] across multiple runs.
  - Validated functionality for edge cases:
    - n = 0: Always returns 0.
    - Negative n: Throws an appropriate error.
  - Verified uniform distribution of values over 1000 trials.

### Results:

- All tests passed.
- The implementation produces consistent and expected results.
