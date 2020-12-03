const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/public'),
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        },
      },
    },
  },
};
