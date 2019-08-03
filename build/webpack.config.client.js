const path = require('path')
const VueLoadPlugins = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const devServer = {
    port:8888,
    host:'0.0.0.0',
    overlay: {
        errors: true
    }
}

const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    })
]


if(isDev){
    configs = merge(baseConfig,{
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
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
}else{
    //js 类库 文件打包
    configs = merge(baseConfig,{
        entry:{
            app:path.join(__dirname,'../client/index.js'),
            vendor:['vue']
        },
        output:{
          filename:"[name].[chunkhash:8].js"
        },
        module:{
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback:'vue-style-loader',
                        use:[
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('style.[md5:contentHash:hex:8].css'),
            new webpack.optimize.SplitChunksPlugin({
                name:'vendor'
            }),
            new webpack.optimize.RuntimeChunkPlugin({
                name:'runtime'
            })
        ])
    })
}
module.exports = configs