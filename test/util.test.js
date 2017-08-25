/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 14:16.
 **************************************************/
import {
  fnBuildCopyFiles,
  fnBuildExternals,
  fnBuildHTMLData,
  fnBuildHTML,
} from '../src/util'

test('fnBuildCopyFiles', () => {
  let files = {
    'whatwg-fetch': {path: 'node_modules/whatwg-fetch/fetch.js'},
    'es6-promise': {path: 'node_modules/es6-promise/dist/es6-promise.auto.min.js'},

    'didi-callback.html': {path: 'src/didi-callback.html'},
    'didi-reopen.html': {path: 'src/didi-reopen.html'},
    'help-writtenoff.html': {path: 'src/help/help-writtenoff.html'},
    'help-writtenoff-image': {path: 'src/help/help-writtenoff-image.png'},
    'help-feetype.html': {path: 'src/help/help-feetype.html'},
    'help-feetype-image': {path: 'src/help/help-feetype-image.png'},

    'experience': {path: 'src/plugins/experience/', to: 'experience/'},
    'aaaa': 'iiosdo/adasd/asdasd.js',
    'bbsh': 'src/plugins/experience/',

  }

  let oo = fnBuildCopyFiles(files)

  expect(oo).toEqual([
    {'from': 'node_modules/whatwg-fetch/fetch.js',},
    {'from': 'node_modules/es6-promise/dist/es6-promise.auto.min.js',},
    {'from': 'src/didi-callback.html',},
    {'from': 'src/didi-reopen.html',},
    {'from': 'src/help/help-writtenoff.html',},
    {'from': 'src/help/help-writtenoff-image.png',},
    {'from': 'src/help/help-feetype.html',},
    {'from': 'src/help/help-feetype-image.png',},
    {'from': 'src/plugins/experience/', 'to': 'experience/'},
    {'from': 'iiosdo/adasd/asdasd.js',},
    {'from': 'src/plugins/experience/',},
  ])

})

test('fnBuildExternals', () => {
  let externals = {
    'react': {name: 'React', path: 'node_modules/react/dist/react.js'},
    'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},

    'big.js': {name: 'Big', path: 'node_modules/big.js/big.min.js'},
    'redux': {name: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
    'moment': {name: 'moment', path: 'node_modules/moment/min/moment.min.js'},
    'jquery': 'jQuery',
    '$': 'jQuery',
  }

  let oo = fnBuildExternals(externals)

  expect(oo).toEqual({
    'big.js': 'Big',
    'moment': 'moment',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'jquery': 'jQuery',
    '$': 'jQuery',
  })
})

test('fnBuildHTMLData:production', () => {
  let externals = {
    'react': {name: 'React', path: 'node_modules/react/dist/react.js'},
    'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},

    'big.js': {name: 'Big', path: 'node_modules/big.js/big.min.js'},
    'redux': {name: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
    'moment': {name: 'moment', path: 'node_modules/moment/min/moment.min.js'},
    'jquery': 'jQuery',
    '$': 'jQuery',
  }

  let oo = fnBuildHTMLData(externals, 'production')

  expect(oo).toEqual([
    'react.js', 'react-dom.js', 'big.min.js', 'redux.min.js', 'moment.min.js'])

})

test('fnBuildHTMLData:development', () => {
  let externals = {
    'react': {name: 'React', path: 'node_modules/react/dist/react.js'},
    'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},

    'big.js': {name: 'Big', path: 'node_modules/big.js/big.min.js'},
    'redux': {name: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
    'moment': {name: 'moment', path: 'node_modules/moment/min/moment.min.js'},
    'jquery': 'jQuery',
    '$': 'jQuery',
  }

  let oo = fnBuildHTMLData(externals, 'development')

  expect(oo).toEqual([
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/big.js/big.min.js',
    'node_modules/redux/dist/redux.min.js',
    'node_modules/moment/min/moment.min.js'
  ])

})

test('fnBuildHTML:production', () => {
  let context = {
    entry: {
      'debugger': './src/hosting/debugger/index.js',
      'dingtalk': './src/hosting/dingtalk/index.js',
      'dingtalk-message-web': './src/hosting/dingtalk/message.js',
      'dingtalk-message-applet': './src/hosting/dingtalk/message.js'
    },

    externals: {
      'react': {name: 'React', path: 'node_modules/react/dist/react.js'},
      'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},

      'big.js': {name: 'Big', path: 'node_modules/big.js/big.min.js'},
      'redux': {name: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
      'moment': {name: 'moment', path: 'node_modules/moment/min/moment.min.js'},
      'jquery': 'jQuery',
      '$': 'jQuery',
    },

    sdks: {
      'debugger': [
        'es6-promise.auto.min.js',
        'fetch.js',
      ],

      'dingtalk': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js',
      ],

      'dingtalk-message-web': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js',
      ],

      'dingtalk-message-applet': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js',
      ],
    },

    htmlWebpackPluginOptions: null

  }

  let env = 'production'

  let oo = fnBuildHTML(context, env)

  expect(oo).toEqual([{
    'PATHS': ['react.js', 'react-dom.js', 'big.min.js', 'redux.min.js', 'moment.min.js', 'es6-promise.auto.min.js', 'fetch.js'],
    'excludeChunks': ['debugger'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'debugger.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['react.js', 'react-dom.js', 'big.min.js', 'redux.min.js', 'moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js'],
    'excludeChunks': ['dingtalk'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['react.js', 'react-dom.js', 'big.min.js', 'redux.min.js', 'moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js'],
    'excludeChunks': ['dingtalk-message-web'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk-message-web.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['react.js', 'react-dom.js', 'big.min.js', 'redux.min.js', 'moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js'],
    'excludeChunks': ['dingtalk-message-applet'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk-message-applet.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }])

})

test('fnBuildHTML:development', () => {
  let context = {
    entry: {
      'debugger': './src/hosting/debugger/index.js',
      'dingtalk': './src/hosting/dingtalk/index.js',
      'dingtalk-message-web': './src/hosting/dingtalk/message.js',
      'dingtalk-message-applet': './src/hosting/dingtalk/message.js'
    },

    externals: {
      'react': {name: 'React', path: 'node_modules/react/dist/react.js'},
      'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},

      'big.js': {name: 'Big', path: 'node_modules/big.js/big.min.js'},
      'redux': {name: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
      'moment': {name: 'moment', path: 'node_modules/moment/min/moment.min.js'},
      'jquery': 'jQuery',
      '$': 'jQuery',
    },

    sdks: {
      'debugger': [
        'es6-promise.auto.min.js',
        'fetch.js',
      ],

      'dingtalk': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js',
      ],

      'dingtalk-message-web': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js',
      ],

      'dingtalk-message-applet': [
        'es6-promise.auto.min.js',
        'fetch.js',
        'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js',
      ],
    },

    htmlWebpackPluginOptions: null

  }

  let env = 'development'

  let oo = fnBuildHTML(context, env)

  expect(oo).toEqual([{
    'PATHS': ['node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js', 'node_modules/big.js/big.min.js', 'node_modules/redux/dist/redux.min.js', 'node_modules/moment/min/moment.min.js', 'es6-promise.auto.min.js', 'fetch.js'],
    'excludeChunks': ['debugger'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'debugger.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js', 'node_modules/big.js/big.min.js', 'node_modules/redux/dist/redux.min.js', 'node_modules/moment/min/moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js'],
    'excludeChunks': ['dingtalk'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js', 'node_modules/big.js/big.min.js', 'node_modules/redux/dist/redux.min.js', 'node_modules/moment/min/moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js'],
    'excludeChunks': ['dingtalk-message-web'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk-message-web.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }, {
    'PATHS': ['node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js', 'node_modules/big.js/big.min.js', 'node_modules/redux/dist/redux.min.js', 'node_modules/moment/min/moment.min.js', 'es6-promise.auto.min.js', 'fetch.js', 'https://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js'],
    'excludeChunks': ['dingtalk-message-applet'],
    'favicon': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/favicon.ico',
    'filename': 'dingtalk-message-applet.html',
    'template': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/index.hbs'
  }])

})