const { injectBabelPlugin } = require('react-app-rewired')
const path = require('path')
const rewireLess = require('react-app-rewire-less')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, './custom_antd_theme.less'), 'utf8')
)

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = injectBabelPlugin(
    [ 'import', { libraryName: 'antd', libraryDirectory: 'es', style: true } ]
    , config
  )
  config = rewireLess.withLoaderOptions({
    modifyVars: themeVariables,
  })(config, env);
  config = injectBabelPlugin("styled-jsx/babel", config)
  return config;
}
