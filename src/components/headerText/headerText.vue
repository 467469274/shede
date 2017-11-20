<template>
  <div style="width: 50%;float: left;color:#aa0000;font-size:20px">
    <span v-show="routerData == 'commentInfo'">评论管理-资讯</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        commList:'commList'
      }
    },
    computed:{
      routerData(){
        return this.$route.name
      }
    },
    watch:{

    }
  }
</script>
<style>
</style>
