var path = requir('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: [ 'react', 'es2015', 'stage-0' ],
                    plugins: [ 'react-html-attrs' , 'transform-class-properties' , 'transform-decorators-legacy' ]
                }
            }
        ]
    }
};


