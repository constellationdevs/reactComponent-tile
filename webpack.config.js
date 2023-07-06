const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProd = LAUNCH_COMMAND === 'prod';

console.log("Production Build: " + isProd);

const baseConfig = {
    context: __dirname,
    entry: './src/index.tsx',
    plugins: [
        new HtmlWebpackPlugin({ title: 'Caching' }),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.[contenthash].js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        port: 3000
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/i,
            exclude: /node_modules/,
            use: 'babel-loader'

        },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader?name=./[name].[ext]'
            }
        ]
    },
    externals: {
        'onsenui': 'ons'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    }

};


const devConfig = {
    devtool: 'eval',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }), new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        })
    ]
};

const prodConfig = {
    devtool: 'source-map',
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
        minify: {
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            removeComments: true,
            useShortDoctype: true,
            keepClosingSlash: true,
            collapseWhitespace: false,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/*.png'),
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("./[name][ext]");
                    }
                },
                {
                    from: path.resolve(__dirname, './public/custom_console.js'),
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("./[name][ext]");
                    }
                },
                {
                    from: path.resolve(__dirname, './public/tile*'),
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("./[name][ext]");
                    }
                },
                {
                    from: path.resolve(__dirname, './public/*.less'),
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("./[name][ext]");
                    }
                }]
        })
    ]
};

const mainConfig = isProd ? {
    ...baseConfig,
    ...prodConfig
} : {
    ...baseConfig,
    ...devConfig
};

module.exports = mainConfig;