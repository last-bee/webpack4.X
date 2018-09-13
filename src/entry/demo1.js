import Vue from 'vue'
require('../css/demo.less')

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components:{},
    mounted:function(){
        console.log(document.referrer)
        console.log(window.location.href)
    }
})