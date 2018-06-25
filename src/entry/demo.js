require ('../css/demo.css')
require ('../css/index.less')
console.log(process.env.NODE_ENV)
import Vue from 'vue'
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})