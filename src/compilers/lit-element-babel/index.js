require('@babel/preset-env');
require('@babel/core');
require('@babel/plugin-proposal-class-properties');
require('@babel/plugin-proposal-decorators');
require('@babel/plugin-proposal-export-default-from');
require('@babel/plugin-proposal-export-namespace-from');

const baseCompile = require('@bit/bit.envs.internal.babel-base-compiler');
const compiledFileTypes = ['js', 'jsx', 'ts'];

const compile = (files, distPath) => {
  return baseCompile(files, distPath, __dirname, compiledFileTypes);
}

module.exports = {
    compile
};