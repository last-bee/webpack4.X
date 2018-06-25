'use strict'
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const glob = require('glob')
let entryHtmlPlugin = []
let entryJs = {}
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
glob.sync(path.resolve(__dirname,'../src/entry','**/*.js')).forEach((item) => {
    let name = item.substring(item.lastIndexOf('/')+1,item.lastIndexOf('.'))
    entryJs[name] = item
    entryHtmlPlugin.push(new htmlPlugin({
        minify:{
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        hash:true,
        template:`./src/${name}.html`,
        chunks: [name],
        chunksSortMode: 'manual',
        filename:`${name}.html`
    }))
})
let moduleLoader = {
    rules:[
        {    
            test: /\.js$/,    
            include: ['src/'],  
            loader: 'babel-loader'    
        },
        {
            test:/\.css$/,
            use:[
                {
                    loader:'style-loader'
                },
                {
                    loader:'css-loader'
                },{
                    loader:'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                          path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                        }
                    }
                }
               
            ]
        },{
            test:/\.(png|jpg|gif)$/,
            use:[{
                loader:'url-loader',
                options:{
                    limit:10000,
                    outputPath:'images/'
                }
            }]
        },{
            test:/\.(htm|html)$/i,
            use:['html-withimg-loader']
        },{
            test:/\.less$/i,
            use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            },
            'postcss-loader'
            ,{
                loader:'less-loader'
            }]
        }
    ]
}
let resolveObj =  {
    extensions: ['.js', '.vue'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'static': resolve('static')
    }
}
module.exports = {
    entryHtmlPlugin,
    entryJs,
    moduleLoader,
    resolveObj
}