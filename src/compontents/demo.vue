<template>
    <div id='demo'>
        {{message}}
    </div>
</template>

<script>
    export default {
        data:function(){
            return{
                message:'hello world  @lastbee163.com'
            }
        }
    }
</script>
<style lang="less" scoped>
#demo{
    background: red;
    color:#fff;
    transform: translate(100px,200px) rotate(45deg);
    transform-origin:0% 0%;
    height: 40px;
    line-height: 40px;
    width:50%;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
}
</style>

