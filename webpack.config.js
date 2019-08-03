const path = require('path')
const VueLoadPlugins = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

configs = {
    target: "web",
    entry:path.join(__dirname,'client/index.js'),
    output:{
      filename:'bundle.[hash:8].js',
      path:path.join(__dirname,'dist')
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
                test:/\.vue$/,
                loader: 'vue-loader'
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
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            limit:1024,
                            name:"[name]-handle.[ext]"
                        }
                    }
                ]
            }
        ]
    }
}

if(isDev){
    configs.output.path = path.join(__dirname,'dev')
    configs.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
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
    configs.devtool = "#cheap-module-eval-source",
    configs.devServer = {
        port:8888,
        host:'0.0.0.0',
        overlay: {
            errors: true
        }
    }
}else{
    //js 类库 文件打包
    configs.entry = {
        app:path.join(__dirname,'client/index.js'),
        vendor:['vue']
    }
    //正式环境css文件分离打包
    configs.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback:'style-loader',
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
    })
    configs.plugins.push(
        new ExtractPlugin('style.[md5:contentHash:hex:8].css'),
        new webpack.optimize.SplitChunksPlugin({
            name:'vendor'
        }),
        new webpack.optimize.RuntimeChunkPlugin({
            name:'runtime'
        })
    )
    configs.output.filename = "[name].[chunkhash:8].js"
}
module.exports = configs