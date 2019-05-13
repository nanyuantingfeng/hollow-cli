/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:55.
 **************************************************/
import autoprefixer from 'autoprefixer'
import flexbugsfixes from 'postcss-flexbugs-fixes'
import { Context, Next } from './types'

export default async function mwPostCSSOptions(context: Context, next: Next) {
  context.postcssOptions = {
    sourceMap: true,
    plugins: [
      flexbugsfixes,
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
        flexbox: 'no-2009'
      })
    ]
  }

  next()
}