// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add additional configurations
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  stream: require.resolve('stream-browserify'),
  util: require.resolve('util/'),
  tty: require.resolve('tty-browserify'),
  os: require.resolve('os-browserify/browser'),
  zlib: require.resolve('browserify-zlib'),
  path: require.resolve('path-browserify'),
  crypto: require.resolve('crypto-browserify'),
  fs: false,
  net: false,
  http: require.resolve('stream-http'),
  https: require.resolve('https-browserify'),
  'raf': require.resolve('raf'),
  'requestAnimationFrame': require.resolve('raf'),
};

module.exports = config; 