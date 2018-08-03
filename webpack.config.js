var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HappyPack = require('happypack')
var rootPath = path.resolve(__dirname, './')
var _env = process.env.NODE_ENV.split('@')

// var phpHost = ''
// var studioHost = ''
module.exports = {
    entry: {
        main: './src/' + _env[1] + '/main.js'
    },
    output: {
        path: rootPath + '/dist/' + _env[1],
        filename: '[name].js?[chunkhash]'
    },
    resolve: {
        extensions: ['.js', '.json', '.less', '.ejs'],
        alias: {
        }
    },
    plugins: [
        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: [{
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }]
        }),
        new HappyPack({
            id: 'less',
            threads: 3,
            loaders:  [{loader: 'css-loader', options: {minimize: true}}, 'postcss-loader', 'less-loader']
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/template/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            envMode: JSON.stringify(_env[0])
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'happypack/loader?id=js',
        },
        {
            test: /\.ejs$/,
            use: 'ejs-loader'
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.css$/,
            use: ["style-loader", {loader: 'css-loader', options: {minimize: true}}, 'postcss-loader']
        },
        {
            test: /\.less$/,
            use: ["style-loader", {loader: 'css-loader', options: {minimize: true}}, 'postcss-loader', 'less-loader']
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=500000'
        },
        {
            test: /\.(ttf|svg|eot|woff)$/,
            use: ['file-loader']
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port:7000,
        inline: true

    },
    mode: _env[0] === 'dev' ? 'development' : 'production'
}
