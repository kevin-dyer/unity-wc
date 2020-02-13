module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions/register',
           '@storybook/addon-knobs/register'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules[2].test = [/src(.*)\.js$/,
    /packages(\/|\\)*(\/|\\)src(\/|\\)(.*)\.js$/,
    /node_modules(\/|\\)lit-html(.*)\.js$/,
    /node_modules(\/|\\)lit-element(.*)\.js$/,
    /node_modules(\/|\\)@open-wc(.*)\.js$/,
    /node_modules(\/|\\)@vaadin(.*)\.js$/]
    return config
  }
};