import pkg from '../../../package.json' assert { type: 'json' };

export const PACKAGE_VERSION = pkg.version;
export const NODE_VERSION = process.version;