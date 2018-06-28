require ('../css/index.less')
// import axios from 'axios'
import Vue from 'vue'
import demoTodo from '@/compontents/demo'
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components:{demoTodo},
    mounted:function(){
        
    }
})