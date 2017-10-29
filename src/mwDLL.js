/**************************************************
 * Created by nanyuantingfeng on 29/10/2017 14:29.
 **************************************************/
import { DllPlugin, DllReferencePlugin, CopyWebpackPlugin } from './plugins'
import path from 'path'

export default async function (context, next) {
  context.dll = false

  next()

  const {dll, plugins, DIRs} = context
  const libraryName = '[name]_[chunkhash]'

  if (Array.isArray(dll)) {
    plugins.push(new DllPlugin({
      path: path.resolve(DIRs.build, 'manifest.json'),
      name: libraryName,
      context: context.context || context.cwd,
    }))

    context.output = {
      path: DIRs.build,
      filename: `${libraryName}.js`,
      library: libraryName,
    }

    context.entry = {dll}
  }

  if (typeof dll === 'string' || dll === true) {
    const dllPath = dll === true ? path.resolve(DIRs.root, 'dll') : dll
    const manifest = require(path.join(dllPath, 'manifest.json'))
    const dllFileName = `${manifest.name}.js`

    plugins.push(new DllReferencePlugin({
      context: context.context || context.cwd,
      manifest,
    }))

    plugins.push(new CopyWebpackPlugin([{
      from: path.join(dllPath, dllFileName),
      to: DIRs.build,
    }]))

    context.DLL_FILENAME = dllFileName
  }

}