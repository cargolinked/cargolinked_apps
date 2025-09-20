const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Monorepo support
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Add support for shared packages
config.resolver.alias = {
  '@cargolinked/types': path.resolve(workspaceRoot, 'packages/types/src'),
  '@cargolinked/utils': path.resolve(workspaceRoot, 'packages/utils/src'),
  '@cargolinked/api': path.resolve(workspaceRoot, 'packages/api/src'),
};

module.exports = config;
