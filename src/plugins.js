/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import mapJSONWebpackPlugin from 'map-json-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const {
  optimize,
  LoaderOptionsPlugin,
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  ProgressPlugin,
  WebpackOptionsValidationError,
  BannerPlugin,
} = webpack

const {CommonsChunkPlugin, UglifyJsPlugin} = optimize

export {
  webpack,
  DefinePlugin,
  ProgressPlugin,
  UglifyJsPlugin,
  CommonsChunkPlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  ExtractTextPlugin,
  HTMLWebpackPlugin,
  CaseSensitivePathsPlugin,
  FriendlyErrorsWebpackPlugin,
  mapJSONWebpackPlugin,
  BannerPlugin,
  BrowserSyncPlugin,
  CopyWebpackPlugin,
  WebpackOptionsValidationError,
}