const path = require('path')
const VueLoadPlugins = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const devServer = {
    port:8080,
    host:'0.0.0.0',
    overlay: {
        errors: true
    }
}

const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: "development"
        }
    }),
    new HTMLPlugin({
      template:path.join(__dirname,'template.html')
    })
]

configs = merge(baseConfig,{
    entry:path.join(__dirname,'../practice/index.js'),
    devtool:"#cheap-module-eval-source",
    output:{
        path: path.join(__dirname,'dev')
    },
    module:{
        rules:[
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    devServer,
    resolve:{
        alias:{
            'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPluins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ])
})

module.exports = configs
