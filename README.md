# MFE Overrides

The mfe-overrides GitHub repository provides a solution for managing overrides in Open edX Micro-Frontends (MFEs). It contains a set of configurations and tools,
including a webpack.config.js file that uses webpack.NormalModuleReplacementPlugin to automatically replace original MFE files with override files during the build process.
A CLI script is also included to simplify the setup, making it easier to manage and apply overrides across different MFEs. This allows developers to centralize and streamline the process of customizing MFEs.

## MFE Overrides Documentation

### Description
- In `overrides`, you'll find directories of all MFEs that need to be overridden.
- The structure should match the original MFE structure for automatic file replacement.
- The main mechanism is in `webpack.config.js`, where `webpack.NormalModuleReplacementPlugin` is used to replace original MFE files with override files at build time.
- The `getOverrides()` function goes through `overrides/currentMfe` recursively and maps the override file with the original one.

### Setup
To set up in MFE, you need to add `webpack.config.js` from the `mfe-overrides` repo to MFE. You can do it like this:

```javascript
const { createConfig } = require('@edx/frontend-build');
const mfeOverrides = require('mfe-overrides/webpack.config');

const config = createConfig('webpack-dev');

config.plugins = [...config.plugins, ...mfeOverrides.plugins];

module.exports = config;
```

### Automation
To avoid extra manual work of adding these settings to MFE, a CLI script was created. If there are no prod, dev, or stage files, it simply copies them from `mfe-overrides`. Otherwise, it uses the `jsdiff` library to merge the existing file with the file from `mfe-overrides`.
1. Install `mfe-overrides` in MFE.
2. Use the CLI script `mfe-overrides-setup`.
3. Now you can override original files in one place. You need to copy the original files into the appropriate structure in `overrides` and make changes.


## Additional notes

Overall, there are three ways to modify MFEs:
1. **Extend**: Override as in my case by creating a new repository with overrides and connecting them using `webpack.config.js`.
2. **Change Root Functionality**: Fork `frontend-build`, perform the same operation with overrides there, but then you'll need to install the forked `frontend-build` in MFE instead of the original.
3. **Wrapper Around MFE**: Described at the beginning of the message.

We are considering build-time changes.

Another option to consider is replacing files before the build, which I think also looks quite convincing. I haven't thought of a serious downside to this option yet.
Development Flow:
- Make changes in MFE
- Store files with changes in a separate repo like `mfe-overrides`
- Run a replacement script from `mfe-overrides` before the build

I think we need to consider the issue of resetting changes in MFE repositories, for example, to update the MFE from upstream."

For more context on Micro-Frontends (MFEs) and build processes, you can refer to resources like [Micro Frontends](https://micro-frontends.org/) and [Webpack documentation](https://webpack.js.org/).
