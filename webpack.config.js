// takes index.html file and bundles it into the same place
// as the webpack bundle ('/dist' in this example).
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html', 
    filename: 'index.html',
    inject: 'body'
})

// using webpack to bundle the index.js from './app' folder
// into the '/dist' folder - and runs it through babel-loader
// finally running the 'HtmlWebpackPlugin' to also include the index.html file
module.exports = {
    devtool: 'source-map',
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/, 
                exclude: /node_modules/,
                loader: 'style-loader!css-loader', 
            }]
    },
    plugins: [HtmlWebpackPluginConfig]
}