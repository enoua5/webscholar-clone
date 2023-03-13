# WebScholar Frontend

## Table of Contents
- [Overview](#overview)
- [First-Time Setup](#first-time-setup)
- [Running the Project](#running-the-project)
- [Documentation](#documentation)

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
> This command "hosts" the documentation on your local machine at `http://localhost:8080`, but you can also kill the terminal and open the documentation via opening `documentation/index.html` in a web browser.

----
© 2023 - WebScholar
