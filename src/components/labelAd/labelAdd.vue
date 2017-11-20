<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="标签名称"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="排序值"
        style="width:30%"
      >
        <el-input v-model="sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm()">保存</el-button>
        <el-button type="danger" @click="resetForm()" v-if="this.$route.params.id!='add'">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:'bannerList',
    data(){return{
      name:'',
      sort:''
    }},
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created(){
      if (this.$route.params.id!='no'){
        let _this = this;
        this.axios.get('http://shede.sinmore.vip/api/admin/labels/edit?label_id='+this.$route.params.id+'&token=000')
          .then(function (response) {
            _this.name = response.data.data.name;
            _this.sort = response.data.data.sort;
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    },
    methods:{
      submitForm(){
        let _this = this;
        let url = '/api/admin/labels/store'
        var obj ={name: _this.name,sort:_this.sort};
        if (this.$route.params.id!='no'){
          obj.label_id = this.$route.params.id;
          url = '/api/admin/labels/update';
        }
        this.postFetch(url, obj,
          function (data) {
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            }else {
              _this.$router.push({path: '/labelAd'});
            }
          },
          function (e) {
            console.log(e)
          }
        )
      },
      resetForm(){
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>
