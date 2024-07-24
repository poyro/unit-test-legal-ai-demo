# unit-test-legal-ai-demo

Demo code for article on using [Poyro](https://github.com/poyro/poyro) to [test a legal AI app](https://docs.poyro.dev/essays/unit-testing-a-legal-ai-app).

# Replicate from scratch

## Setup

Need to have npm installed, then:

```bash
mkdir unit-test-legal-ai-demo
cd unit-test-legal-ai-demo
npm init -y
npx poyro init # Accept all changes if fresh project
```

Note that `npx poyro init` adds dependencies for Vitest and Poyro **and** installs them for you.

## Create tests

```bash
mkdir tests
mkdir utils
```

Then create whatever test files you'd like and utility functions.

You can create tests anywhere in your project structure. As long as they end in `test.js` or `test.ts` the `pnpn test` will find them.

## Run the tests

```bash
pnpm test
```