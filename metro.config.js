// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withSentryConfig: withApmConfig } = require('reactnative-plugin-appice-apm/metro');

const base = getDefaultConfig(__dirname);

const config = {
  transformer: {
    // keep console.* in release bundles
    minifierConfig: {
      compress: { drop_console: false },
    },
  },
  // optional: helps some libs that ship .cjs
  resolver: { sourceExts: [...base.resolver.sourceExts, 'cjs'] },
};

module.exports = withApmConfig(mergeConfig(base, config));
