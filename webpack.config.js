// webpack.config.js
var webpack = require('webpack');

module.exports = {
    entry: {
        entry: __dirname + '/app/game.js'
    },
    output: {
        filename: '[name].bundle.js',
        libraryTarget: 'var',
        library: 'Controller'
    },
    mode: "development"
}
