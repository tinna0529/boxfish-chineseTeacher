/**
 * Created by Tinna on 2016/05/08
 * */

var webpack = require('webpack');
module.exports = {
    entry : './index.js',
    output : {
        path : './',
        filename : 'main.js'
    },
    devServer : {
        inline : true,
        port : 8080
    },
    module : {
        loaders:[
            {
                test:/\.js$/,
                exclude:'/node_modules/',
                loader:'babel-loader?presets[]=es2015&presets[]=react'
            },
            // {
            //     conf : /\.jsx$/,
            //     exclude : '/node_modules/',
            //     loader : ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015']
            // },
            {
                test : /\.less$/,
                exclude : '/node_modules/',
                loader : 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test : /\.json$/,
                exclude : '/node_modules/',
                loader : 'json-loader'
            },
            {
                test : /\.(png|jpg|woff|woff2|svg|ttf|eot)$/,
                exclude : '/node_modules/',
                loader : 'url-loader?limit=8192'
            }
            // {
            //     conf : /\.(mp4|ogg)$/,
            //     exclude : '/node_modules/',
            //     loader : 'file-loader'
            // }
        ]
    }
};
