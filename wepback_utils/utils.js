const path = require("path");
const local_env = 'development'
const isDev = local_env === 'development'
const isProd = !isDev
const getFilename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const ignoreDepsPath =  path.resolve(__dirname,'node_modules')

module.exports = {
    isDev,
    isProd,
    getFilename,
    ignoreDepsPath
}
