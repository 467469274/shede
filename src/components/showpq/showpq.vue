<template>
  <div class="showpqs">

    <p v-for="(list,index) in tableData">
      <span v-for="(item,indexs) in list">{{item}}</span>
    </p>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'showpq',
      data(){
        return{
          tableData:[]
        }
      },
      created(){
        let _this= this;
        let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
        this.axios.get('http://shede.sinmore.vip/api/admin/goods/schedule?token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token+'&goods_id='+_this.$route.params.id)
          .then(function (response) {
            if(response.data.error_code == 8){
              alert(response.data.error_msg)
            }
            _this.tableData = response.data.data.table;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      methods:{

      }
    }
</script>
<style>
  .showpqs{
    width: 100%;
  }
  .showpqs p span{
    flex: 1;
    text-align: center;
    line-height: 45px;
  }
  .showpqs :last-child{
    border-bottom: 1px solid #ccc!important;
  }
  .showpqs p{
    display:flex;
    border: 1px solid #ccc;
    border-bottom: 0px;
  }
</style>
