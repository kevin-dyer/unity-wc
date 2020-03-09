## Running app
```npm start```
or
```npm start -- --hostname 0.0.0.0 --port 4444```

[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

> ## 🛠 Status: In Development
> PWA Starter Kit is currently in development. It's on the fast track to a 1.0 release, so we encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.
>
> See the list of Known Issues and TODOs, below, for updates.

# MOCC2 Add Components
1) Create wrapper component `my-componentName.js` that will import component and renders it (see `my-table` for example)
1) Add page to load/router action in `actions/app.loadPage`
1) Add links and wrapper component to the main `my-app` file
1) Create folder/files for components and get to work

# PWA Starter Kit

This sample app is a starting point for building PWAs. Out of the box, the template
gives you the following features:
- all the PWA goodness (manifest, service worker)
- a responsive layout
- application theming
- example of using Redux for state management
- offline UI
- simple routing solution
- fast time-to-interactive and first-paint through the PRPL pattern
- easy deployment to prpl-server or static hosting
- unit and integrating testing starting points
- documentation about other advanced patterns.

### 📖 Head over to the [documentation site](https://pwa-starter-kit.polymer-project.org/) for more details or check out [how to get started](https://pwa-starter-kit.polymer-project.org/setup)!

![pwa-starter-kit screenshot](https://user-images.githubusercontent.com/1369170/39715580-a1be5126-51e2-11e8-8440-96b07be03a3c.png)

## TODOs

- [x] Setup Safari testing on Travis.
- [x] Deploy all templates as demos.
- [ ] Update to latest [Material Web Components](https://github.com/material-components/material-components-web-components).


## Testing

Test files must be located in the `test/unit/` folder and end with `.test.js`. We use the `@open-wc/testing` library to set up and run tests (see [open-wc testing](https://open-wc.org/testing/)). This uses [Karma](https://karma-runner.github.io/latest/index.html) as a runner, [Mocha](https://mochajs.org/) for setting up tests, and [Chai](https://www.chaijs.com/) for assertions.

To run the tests, run `npm test`. It will display success/errors and code coverage on console, and also will create a `coverage` folder with complete coverage results. The tests will fail if a minimum of coverage is not reached. To see the complete coverage results, open the `coverage/index.html` file in the browser. There you can inspect the code to see how many times each line of code is executed in the tests, and which statements/functions/branches are not executed at all.

A CI pipeline is configured in Gitlab to run unit tests when pushing or merging to `develop`. The pipeline is triggered with each merge request created or when new code is pushed to it. If the unit tests fail (because of test failure or insufficient coverage), it will prevent the user from merging.
