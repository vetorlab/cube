const path = require("path");


module.exports = {
    mode: 'production',
    
    entry: {
        demo: path.join(__dirname, 'public/demo.js'),
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
    },

    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
        ],
    },
}