const { ProgressPlugin } = require("webpack");

const BUNDLE_TYPE = process.env.BUNDLE_TYPE || 'background';

const webpackExtention = require(`./webpacks/${BUNDLE_TYPE}.webpack.config.js`);

module.exports = () => {
  return {...webpackExtention, ...{
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          use: 'file-loader?name=[name].[ext]'
        }
      ],
    },
    plugins: [
      new ProgressPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    }
  }}
};
