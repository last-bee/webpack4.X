<template>
    <div class="container" ref="container" :style='style'
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @mousedown='onTouchStart'
        @mouseover="onTouchMove"
        @mouseup="onTouchEnd"
        
        >
        <slot/>
    </div>
</template>

<script>
    export default {
        name:'refresh',
        data(){
            return{
                container:'',
                clientHeight:'',
                scrollTop:'',
                scrollHeight:'',
                status:'1',
                duration:'',
                height:0,
                startX:'',
                startY:'',
                deltaX:'',
                deltaY:''
            }
        },
        computed:{
            style() {
                return {
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0,${this.height}px, 0)`
                };
            }
        },
        methods:{
            handleScroll(){
                this.scrollTop = document.documentElement.scrollTop
                this.scrollHeight = document.body.scrollHeight;
                // console.log(this.scrollTop)
                if(this.scrollTop === 0){
                    this.status = '1'
                }else{
                    this.status = '0'
                    this.height = '0'
                }
                // console.log(this.status)
            },
            onTouchStart(event){
                this.duration = 0
                this.startY = event.touches[0].clientY;
            },
            onTouchMove(event) {
                if(this.status !== '1'){
                    return
                }
                const touch = event.touches[0];
                console.log(event.touches[0].clientY)
                
                const offsetY =  touch.clientY - this.startY;
                if(offsetY){
                    this.height = offsetY  
                }
                console.log(this.height)
            },
            onTouchEnd(event) {
                if(this.status !== '1'){
                    return
                }
                this.duration = 300
                this.height = 0
            },
        },
        mounted(){
            this.clientHeight = document.documentElement.clientHeight;
            
            window.addEventListener('scroll',this.handleScroll)
        }
    }
</script>

<style scoped>
.container{

}
</style>