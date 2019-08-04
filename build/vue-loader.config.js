const docsloader = require('./doc-loader.js')
module.exports = (isDev)=>{
    return {
        preserveWhiteSpace: true,
        extractCss:!isDev,
        cssModules: {
            localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
            camelCase: true
        },
        hotReload: false
    }
}