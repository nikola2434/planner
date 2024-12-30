import { Configuration, DefinePlugin } from 'webpack';
import { BuildOptions } from './types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
  const isProd = options.mode === 'production';
  const html = options.paths.html;

  const plugins: Configuration['plugins'] = [
    new Dotenv(),
    new DefinePlugin({ 'window.version': JSON.stringify(require(options.paths.packageJSON).version) }),
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: '.',
          filter: (resourcePath) => {
            if (resourcePath.includes('.html')) return false;
            return true;
          },
        },
      ],
    }),
  ];

  if (typeof html === 'string') {
    plugins.push(new HtmlWebpackPlugin({ template: html }));
  } else {
    Object.entries(html).forEach(([name, path]) => {
      plugins.push(
        new HtmlWebpackPlugin({
          template: path,
          filename: `${name}.html`,
          chunks: [name],
        }),
      );
    });
  }

  if (!isProd) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin());
  }

  return plugins;
};
