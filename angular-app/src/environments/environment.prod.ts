const packageJSON = require('../../package.json');

export const environment = {
  production: true,
  version: packageJSON['version'],
  host: 'http://localhost:3000/',
};
