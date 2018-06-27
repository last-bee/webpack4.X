require ('../css/index.less')
import axios from 'axios'
import Vue from 'vue'
import demo from '@/compontents/demo'
console.log(demo)
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components:{demo},
    mounted:function(){
        
    }
})