const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');
const env = require('./build/env');

// Sass deprecations triggered by Bootstrap 3, which we can't change
// CommonJS output, because vue-loader 15 imports styles with a default import
const cssExtract = { loader: MiniCssExtractPlugin.loader, options: { esModule: false } };

const roundDecimals = path.resolve(__dirname, 'build/round-decimals-loader.js');

const sassOptions = {
  quietDeps: true,
  silenceDeprecations: ['import', 'slash-div', 'global-builtin', 'color-functions'],
};

module.exports = (_, argv) => {
  const production = argv.mode !== 'development';

  return {
    mode: production ? 'production' : 'development',
    entry: {
      app: './src/main.js',
      loader: './src/loader.js',
      background: './src/background.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'static/js/[name].js',
      clean: true,
    },
    // Extension CSP forbids eval, so no eval-based source maps even in development
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue'],
      // vue-tables-2 pulls in micromatch, which needs Node's path module
      fallback: { path: require.resolve('path-browserify') },
      alias: {
        vue$: 'vue/dist/vue.runtime.common.js',
        src: path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: [cssExtract, 'css-loader'],
        },
        {
          // <style lang="sass"> (indented syntax)
          test: /\.sass$/,
          use: [cssExtract, 'css-loader', roundDecimals, {
            loader: 'sass-loader',
            options: { sassOptions: { ...sassOptions, syntax: 'indented', loadPaths: [__dirname] } },
          }],
        },
        {
          test: /\.scss$/,
          use: [cssExtract, 'css-loader', roundDecimals, {
            loader: 'sass-loader',
            options: { sassOptions: { ...sassOptions, loadPaths: [__dirname] } },
          }],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10000 } },
          generator: { filename: 'static/img/[name].[hash:7][ext]' },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10000 } },
          generator: { filename: 'static/fonts/[name].[hash:7][ext]' },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': env(production ? 'production' : 'development'),
      }),
      // micromatch (via vue-tables-2) reads process.platform; webpack 5 no longer provides it
      new webpack.ProvidePlugin({ process: 'process/browser.js' }),
      new MiniCssExtractPlugin({ filename: 'static/css/[name].css' }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        chunks: ['app'],
        inject: 'body',
        scriptLoading: 'blocking',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'static/img' },
          {
            from: 'src/manifest.json',
            transform(content) {
              const manifest = JSON.parse(content.toString());
              manifest.name = pkg.name;
              manifest.description = pkg.description;
              manifest.version = pkg.version;
              return JSON.stringify(manifest, null, 2);
            },
          },
        ],
      }),
    ],
    performance: { hints: false },
    // vue-loader 15 imports every <style> block's default export, which only exists with CSS modules (unused here)
    ignoreWarnings: [/export 'default' \(imported as 'style\d+'\) was not found/],
  };
};
