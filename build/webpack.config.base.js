const path = require('path')
const VueLoadPlugins = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const vueloaderOptions = require('./vue-loader.config.js')

configs = {
    target: "web",
    entry:path.join(__dirname,'../client/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'../dist')
    },
    plugins:[
        new VueLoadPlugins(),
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"prodction"'
            }
        })
    ],
    module:{
        rules:[
            {
              test:/\.(vue|js|jsx)$/,
              loader:'eslint-loader',
              exclude:/node_modules/,
              enforce:'pre'
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options: vueloaderOptions(isDev)
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            limit:1024,
                            name:"resources/[path][name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    }
}


module.exports = configs