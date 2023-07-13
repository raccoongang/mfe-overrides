const { createConfig } = require('@edx/frontend-build');
const mfeOverrides = require('mfe-overrides/webpack.config');

const config = createConfig('webpack-prod');

config.plugins = [...config.plugins, ...mfeOverrides.plugins];

module.exports = config;
