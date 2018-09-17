const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'chronology.js',
    path: path.resolve(__dirname, '../docs')
  },
  optimization: {
    minimize:true
  }
};
