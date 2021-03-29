const path = require('path')
const nodeExternals = require('webpack-node-externals');
module.exports = {
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  entry: './src/index.ts',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.js'
  },
  target: "node",
}