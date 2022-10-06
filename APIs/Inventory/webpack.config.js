const path = require('path');

module.exports = {
    entry: [
      'regenerator-runtime/runtime',
      './src/index.js'
    ],
    target: 'node',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
            "@Routes": path.resolve(__dirname, "src/routes"),
            "@Common": path.resolve(__dirname, "src/common"),
        }
    },
}
