# Playwright demo for MTC

<!-- 🇧🇷 Para Português, [clique aqui](./README.br.md). -->

Hi 👋🏽!

Tests at https://www.saucedemo.com/ using [Playwright](https://playwright.dev/) for the [MTC 2023](http://minastestingconference.com.br/).
With and without pom and github actions.

By [Renata Andrade](https://www.linkedin.com/in/raptatinha/)

If you find it useful, consider leaving a ⭐️ for this repo.

Happy Testing 🎭!

## 🪜 Dependecies

- Playwright v1.35.0
- dotenv v16.1.4
- Node v20.3.0
- npm v9.6.7
- VSCode 1.78.2 (Universal)

> Pre requirements:

- [Node setup](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [VS Code setup](https://code.visualstudio.com/learn/get-started/basics)
- [iTerm setup](https://iterm2.com/documentation-one-page.html)


## 💡 Fork and clone the project

1. Copy the project URL `https://github.com/raptatinha/twr-playwright-demo-mtc.git`;
1. Fork the project following the [GitHub instructions](https://docs.github.com/en/get-started/quickstart/fork-a-repo) - (use the parameter --clone=true);
1. Access the forked project `cd twr-playwright-demo-mtc`

## 🧬 Setup and Install

1. Set up the environment variables.

    1.1. Create the following file in the project root folder:

   - .env

    1.2. Copy the content of [.env.example](.env.example) into the newly created file.</br>
    1.3. Update the PASSWORD (you can check the password here: https://www.saucedemo.com/).

2. On your terminal, type:

   2.1. `npm i`

## 🚀 Run
All the commands are in the [package.json](package.json).

- Run tests without POM: `npm run test-ui`
- Run tests without POM on chrome only: `npm run test-ui-c`
- Run tests with POM: `npm run test-ui-pom`

## 📊 Report

`npx playwright show-report`
## 🌀 Pipeline

Using GitHub Actions.
Check [playwright.yml](.github/workflows/playwright.yml)

___


💡 Share on LinkedIn something interesting you've learned! Don't forget to tag me [Renata Andrade](https://www.linkedin.com/in/raptatinha/).

💜 If you have questions, feel free to post them on [github](https://github.com/raptatinha/twr-playwright-demo-mtc/issues).

Happy Testing 🎭
