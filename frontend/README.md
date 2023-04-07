# WebScholar Frontend

## Table of Contents

-   [Overview](#overview)
-   [First-Time Setup](#first-time-setup)
-   [Running the Project](#running-the-project)
-   [Documentation](#documentation)
-   [Testing](#testing)
-   [Code Formatting](#code-formatting)
-   [Linter](#linter)

<br>

## Overview

Welcome to the frontend of the WebScholar web application. The WebScholar frontend is built primariy using Angular and Bootstrap, but has several other supporting technologies.

<br>

## First-Time Setup

This section details how new developers to the frontend can build and run the frontend for the first time.

### Installing Angular

> This section assume that you have already installed Node.js. If you do not have node.js installed, install version 16.19.0.

1. Open a terminal.
2. Run the following command:

```
npm install -g @angular/cli
```

### Installing Project Dependencies

1. Open a terminal (or use an existing terminal).
2. Navigate to the `frontend` folder of the `WebScholar` repository.
3. Run the following commands to ensure that you're up to date with the latest version of the project:

```
git checkout master
git pull
```

4. Then, run the following commands to install all of the necessary dependencies:

```
npm install
```

> Note that the above command may indicate vulnerabilities. This is expected, and you may ignore that message.

<br>

## Running the Project

This section details how to run the frontend application. Note that you do not need to re-run the frontend after making changes; Angular will automatically rebuild and reload each time you save changes.

1. In a terminal, navigate to the `frontend` folder of the `WebScholar` repository.
2. Run the following command:

```
ng serve --open
```

> The command `npm start` will also work, but won't redirect you to the WebScholar home page. In this case, simply navigate to `http://localhost:4200`.

<br>

## Documentation

The documentation for the frontend is powered by Compodoc, a documentation tool that scans source code and compiles developer comments into user-friendly, HTML-based documentation.

### How to Generate & View the Documentation

This section details how a developer can generate the documentation pages for the frontend. These pages will be generated in the `frontend/documentation` folder.

1. Open a terminal.
2. Navigate to the `frontend/` folder of the `WebScholar` repository.
3. Run the following command:

```
npm run doc
```

> This command "hosts" the documentation on your local machine at `http://localhost:48620`, but you can also kill the terminal and open the documentation via opening `documentation/index.html` in a web browser.

<br>

## Testing

This section details how a developer can run both the unit and UI tests for the frontend project.

<br>

### How to Run the Unit Tests

The WebScholar frontend utilizes a unit testing framework called Jasmine. To run our unit tests, do the following:

1. Open a terminal.
2. Navigate to the `frontend/` folder of the `WebScholar` repository.
3. Run the following command:

```
npm install
```

> If the above command fails, delete your `node_modules` folder and try again. 4. Then, run:

```
npm run unit-test
```

5. This should open a web browser, running Jasmine, on your machine. In this window, you'll see the results for all of the unit tests in the frontend's main project (i.e. all components under `src/`).
6. Press CTRL-C to stop running these unit tests and move on to the next ones.
7. This should then re-open your browser, this time running the unit tests for the `new-password-form` subproject.

> Note that you can make changes to the unit tests while keeping the Jasmine window open. It will automatically re-run the tests with your changes. Neat!

<br>

### UI (E2E) Tests

The frontend project utilizes an automated UI testing tool called Cypress. Cypress supports both Component and E2E level UI tests.

Using Cypress, a developer can run the project's UI tests in either an _interactive_ or _headless_ mode.

### How to Run the UI Tests Interactively

To run the frontend's UI tests interactively, do the following:

1. Open a terminal and navigate to the `frontend/` directory.
2. Run `npm install`. If this command fails, delete your `node_modules` folder and try again.
3. [Run the frontend project](#running-the-project).
4. Then, in a separate terminal or terminal tab, run `npm run cypress`.
5. This will open Cypress for you, prompting you to choose between which tests you'd like to run: E2E or Component. Choose whichever you'd like to run.
6. Then, choose the browser that you'd like to run the tests with and click "Start Testing".
7. Finally, Cypress should open a browser for you that displays a list of all of the tests you can run. Click on any test to run it.
8. When you're done testing, you can close Cypress by returning to the desktop application and clicking the "Close" button. (Alternatively, you can press CTRL-C in your original terminal.)

<br>

### How to Run the UI Tests Headlessly

To run all of the frontend's UI tests without having to open a browser, you can do the following:

1. Open a terminal and navigate to the `frontend/` directory.
2. Run `npm install`. If this command fails, delete your `node_modules` folder and try again.
3. [Run the frontend project](#running-the-project).
4. Then, in a separate terminal or terminal tab, run `npm run ui-test`.
5. This will run the E2E tests followed by the Component tests in your terminal, displaying the results at the end of each.
6. Cypress will also generate videos of each test in `frontend/cypress/videos`.

## Code Formatting

The WebScholar frontend runs using a code formatter called _Prettier_. This package allows developers to maintain a common coding style across the entire project.

### Configuring Prettier

Ideally, a developer should have the Visual Studio Code plugin installed and configured on their machine to run on save. To do this:

1. In Visual Studio Code, open the Extensions tab.
2. Type `@recommended`. This will show the recommended plugins for this project.
3. Install every plugin you see.
4. Then, navigate to a random `.ts` file.
5. Press `CTRL-SHIFT-P`.
6. In the search bar that pops up, type "Format Document".
7. Press ENTER. This should allow you to select your default formatter as Prettier.
8. Then, navigate to a random `.html` file and repeat steps 5-7.
9. Then, Press `CTRL-,` (CTRL-COMMA). This should open your VS Code settings.
10. Search for "Format".
11. Find the "Editor: Format on Save" setting. Check the box.
12. At this point, restart VS Code.

### Running Prettier Manually

If, for some reason, you need to run Prettier manually on the entire frontend, follow these steps:

> Note: these steps assume that you have recently run `npm install`.

1. Open a terminal.
2. Navigate to the `frontend/` folder.
3. Run `npm run format`.
4. Files displayed in gray are files that were not touched; files displayed in white _were_ touched.

<br>

## Linter

The WebScholar frontend uses an Angular-supported Linter called `ESLint`. In short, a linter increases code quality by pointing out common code infractions, such as unused variables. To run the frontend's linter and see its output:

> Note: These steps assume that you have recently run `npm install`.

1. Open a terminal.
2. Navigate to the `frontend/` folder.
3. Run `npm run lint`.
4. This should then display, per file, the infractions found.

---

© 2023 - WebScholar
