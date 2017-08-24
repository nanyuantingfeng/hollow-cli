/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 14:29.
 **************************************************/
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints'
import { webpack, WebpackOptionsValidationError } from './webpackPlugins'
import createDomain from 'webpack-dev-server/lib/util/createDomain'
import Server from 'webpack-dev-server'
import PromiseDefer from './PromiseDefer'

function colorInfo (msg) {
  return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
}

function colorError (msg) {
  return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`
}

export function startDevServer (webpackConfig, args) {

  const firstWpOpt = Array.isArray(webpackConfig) ? webpackConfig[0] : webpackConfig

  const options = webpackConfig.devServer || firstWpOpt.devServer || {}

  if (!options.stats) {
    options.stats = {
      colors: true,
      cached: false,
      cachedAssets: false
    }
  }

  addDevServerEntrypoints(webpackConfig, options)

  console.log(webpackConfig)

  let defer = PromiseDefer()

  let compiler

  try {
    compiler = webpack(webpackConfig)
  } catch (e) {
    if (e instanceof WebpackOptionsValidationError) {
      console.error(colorError(e.message))
      process.exit(1)
    }
    defer.reject(e)
  }

  let server

  try {
    server = new Server(compiler, options)
  } catch (e) {
    const OptionsValidationError = require('webpack-dev-server/lib/OptionsValidationError')
    if (e instanceof OptionsValidationError) {
      console.error(colorError(e.message))
      process.exit(1)
    }
    defer.reject(e)
  }

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      server.close()
      process.exit()
    })
  })

  server.listen(options.port, options.host, function (err) {
    if (err) throw err
    defer.resolve(server)
    console.info(`\nService is running at ${colorInfo(createDomain(options))}`)
  })

  return defer.promise
}