/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:11.
 **************************************************/
import { join, resolve } from 'path'
import { existsSync } from 'fs'

import {
  CaseSensitivePathsPlugin,
  CommonsChunkPlugin,
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin
} from './webpackPlugins'

import { notifier } from './util'
import fnGetBabelOptions from './fnGetBabelOptions'
import fnGetPostcssOptions from './fnGetPostcssOptions'
import fnGetTSOptions from './fnGetTSOptions'

export default function (args) {
  let {cwd, hash, devtool, limit} = args
  let pkgPath = join(cwd, 'package.json')
  let pkg = existsSync(pkgPath) ? require(pkgPath) : {}

  let jsFileName = hash ? '[name]-[chunkhash].js' : '[name].js'
  let cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  let commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  limit = limit || 10000

  let babelOptions = fnGetBabelOptions()
  let postcssOptions = fnGetPostcssOptions()
  let tsOptions = fnGetTSOptions()

  let theme = {}

  if (pkg.theme && typeof pkg.theme === 'string') {
    let cfgPath = pkg.theme
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = resolve(args.cwd, cfgPath)
    }

    let getThemeConfig = require(cfgPath)
    theme = getThemeConfig()

  }

  else if (pkg.theme && typeof pkg.theme === 'object') {
    theme = pkg.theme
  }

  let emptyBuildIns = [
    'child_process', 'cluster', 'dgram', 'dns', 'fs',
    'module', 'net', 'readline', 'repl', 'tls',
  ]

  let browser = pkg.browser || {}

  let node = emptyBuildIns.reduce((obj, name) => {
    if (!(name in browser)) {
      return {...obj, ...{[name]: 'empty'}}
    }
    return obj
  }, {})

  return {
    cache: true,

    devtool,

    node,

    entry: pkg.entry,

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    resolve: {
      modules: ['node_modules', join(__dirname, '../node_modules')],
      extensions: [
        '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
        '.ts', '.tsx', '.lazy.js', '.js', '.jsx', '.json'],
    },

    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test (filePath) {
            return /\.lazy\.jsx?$/.test(filePath)
          },
          exclude: /node_modules/,
          use: [{loader: 'babel-loader', options: babelOptions},
            {loader: 'bundle-loader?lazy'}]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{loader: 'babel-loader', options: babelOptions}],
        },
        {
          test: /\.jsx$/,
          use: [{loader: 'babel-loader', options: babelOptions}],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{loader: 'babel-loader', options: babelOptions},
            {loader: 'ts-loader', options: tsOptions}]
        },
        {
          test (filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
          },
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader?sourceMap&-restructuring&-autoprefixer',},
              {loader: 'postcss-loader', options: postcssOptions},
            ]
          }),
        },
        {
          test: /\.module\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer'},
              {loader: 'postcss-loader', options: postcssOptions},
            ]
          }),
        },
        {
          test (filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
          },
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              `css-loader?sourceMap&-autoprefixer`,
              {loader: 'postcss-loader', options: postcssOptions},
              `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
            ]
          }),
        },
        {
          test: /\.module\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              `css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer`,
              {loader: 'postcss-loader', options: postcssOptions},
              `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
            ]
          }),
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: [`url-loader?limit=${limit}&minetype=application/font-woff`]
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: [`url-loader?limit=${limit}&minetype=application/font-woff`]
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [`url-loader?limit=${limit}&minetype=application/octet-stream`],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: [`url-loader?limit=${limit}&minetype=application/vnd.ms-fontobject`],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [`url-loader?limit=${limit}&minetype=image/svg+xml`],
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          use: [`url-loader?limit=${limit}`],
        },
        {
          test: /\.html?$/,
          use: [`url-loader?name=[path][name].[ext]`],
        },
      ],
    },

    plugins: [

      new CommonsChunkPlugin({name: 'common', filename: commonName}),

      new ExtractTextPlugin({
        filename: cssFileName,
        disable: false,
        allChunks: true
      }),

      new CaseSensitivePathsPlugin(),

      /*new HtmlWebpackPlugin({
       template: './src/index.html',
       filename: 'index.html'
       }),*/

      new FriendlyErrorsWebpackPlugin({
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            notifier.notify({
              title: 'hollow cli',
              message: 'warn',
              contentImage: join(__dirname, '../assets/warn.png'),
              sound: 'Glass',
            })
            return
          }

          const error = errors[0]

          notifier.notify({
            title: 'hollow cli',
            message: `${severity} : ${error.name}`,
            subtitle: error.file || '',
            contentImage: join(__dirname, '../assets/fail.png'),
            sound: 'Glass',
          })
        },
      }),

    ]
  }

}
