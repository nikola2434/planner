import { ModuleOptions, RuleSetRule } from 'webpack';
import { BuildOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isProd = options.mode === 'production';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif|webp)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: false,
        },
      },
    ],
  };

  const styleLoader: RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isProd ? '[hash:base64:10]' : '[local]_[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const tsLoader: RuleSetRule = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: 'ts-loader',
  };

  return [assetLoader, svgrLoader, styleLoader, tsLoader];
};
