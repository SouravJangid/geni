/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable global-require */
const path = require('path');
const zlib = require('zlib');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const TerserPlugin = require('terser-webpack-plugin');

require('dotenv').config();
const webpack = require('webpack');

const { APP_ENV = 'development' } = process.env;
const pkg = require('./package.json');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function resolvePathsFromTsConfig({ tsconfigPath = './tsconfig.json', webpackConfigBasePath = __dirname } = {}) {
  const { paths, baseUrl } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = paths[item].map((pattern) =>
      path.resolve(webpackConfigBasePath, baseUrl, pattern.replace('/*', '').replace('*', '')),
    );

    aliases[key] = value;
  });

  return aliases;
}

module.exports = (_, { stats, mode }) => {
  const ROOT_DIR = process.cwd();
  const isDev = mode === 'development';
  return {
    mode,
    context: ROOT_DIR,
    entry: path.resolve(ROOT_DIR, 'src/index'),
    target: 'web',
    output: {
      uniqueName: `${pkg.name}-${pkg.version}`,
      path: path.join(ROOT_DIR, 'build'),
      hashDigestLength: 8,
      publicPath: 'auto',
      chunkFilename: 'js/[id].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
      clean: true,
    },
    ...(isDev && {
      devtool: 'eval-source-map',
      devServer: {
        static: {
          directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: process.env.PORT || 3001,
        historyApiFallback: true,
        hot: 'only',
        allowedHosts: 'all',
        proxy: [
          {
            context: ['/api/**'],
            target: 'https://api.doux.pro',
            secure: false,
          },
        ],
        // proxy: require(path.resolve(__dirname, 'config', 'proxies.js')),
      },
    }),

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
          },
          type: 'javascript/auto',
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            {
              loader: 'resolve-url-loader',
              options: {
                silent: true,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path]/[base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        exclude: /.map$/,
      }),
      new CompressionPlugin({
        filename: '[path]/[base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        exclude: /.map$/,
      }),

      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000, // Minimum number of characters
      }),

      // new ForkTsCheckerWebpackPlugin({ async: true }),

      new webpack.ProgressPlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      }),

      new CleanWebpackPlugin({ verbose: true }),

      new HtmlWebpackPlugin({
        template: 'src/public/index.html',
        BUILT_AT: new Date(),
        ...(!isDev && {
          // CSPContent: createCSPs(),
          NODE_ENV: process.env.NODE_ENV,
          APP_ENV: process.env.APP_ENV,
        }),
        isDev: isDev,
      }),
      new Dotenv({
        path: path.resolve(__dirname, 'config', APP_ENV, '.defined.urls'),
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      }),

      new ESLintPlugin({
        fix: true,
        formatter: 'html',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      }),

      isDev && new webpack.HotModuleReplacementPlugin(),

      isDev && new ReactRefreshWebpackPlugin(),

      stats === 'true' &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
        }),
    ].filter(Boolean),
    resolve: {
      alias: resolvePathsFromTsConfig({
        tsconfigPath: path.resolve(ROOT_DIR, 'tsconfig.json'), // Using custom path
        webpackConfigBasePath: path.resolve(ROOT_DIR), // Using custom path
      }),
      extensions: ['.css', '.js', '.jsx', '.scss', '.ts', '.tsx'],
    },
    optimization: {
      // usedExports: true,
      // sideEffects: true,
      // innerGraph: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      providedExports: true,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 3072,
        maxSize: 250000,
      },
    },
  };
};
