const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      frameworks: ['mocha'],
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' },
      ],
      // preprocessors: {
      //   '**/*.js': ['coverage']
      // },
      // see the karma-esm docs for all options
      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true,
      },
      reporters: ['progress', 'junit', 'coverage'],
 
      // the default configuration
      junitReporter: {
        outputDir: 'junit', // results will be saved as $outputDir/$browserName.xml
        outputFile: "report.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '', // suite will become the package name attribute in xml testsuite element
        useBrowserName: false, // add browser name to report and classes names
        nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
        classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
        properties: {}, // key value pair of properties to add to the <properties> section of the report
        xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
      }
    }),
  );
  return config;
};
