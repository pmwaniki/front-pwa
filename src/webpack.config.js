
const path = require('path');


module.exports = {
    context: __dirname,

    entry: {
        main: path.resolve(__dirname, 'src/index'),
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]-[hash].js',
        publicPath: 'http://localhost:3000/',
    },

    plugins: [
        new HtmlWebpackPlugin(HTML_WEBPACK_OPTIONS.main),
        new SWPrecacheWebpackPlugin(SW_PRECACHE_CONFIG),
    ], // add all common plugins here

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }],
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'ejs-loader',
                    options: {
                        includePaths: [
                            path.resolve(__dirname, 'src/templates/'),
                        ],
                    },
                }],
            },
            {test: /\.(png|jpg|gif)$/, use: [{
                    loader: 'url-loader',
                    options: {limit: 8192},
                }]},  // inline base64 URLs <=8k
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{
                    loader: 'file-loader',
                }]},
        ], // add all common loaders here
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
    },
};