<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="网点名称"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="网点简称"
        style="width:30%"
      >
        <el-input v-model="short_name"></el-input>
      </el-form-item>
      <el-form-item
        label="网点地址"
        style="width:100%"
      >
        <el-cascader
          :options="dq"
          v-model="clickDq"
          :props="proo"
          style="display: inline-block;width:30%"
        >
        </el-cascader>
        <el-input v-model="address"
                  style="display: inline-block;width:50%"></el-input>
      </el-form-item>
      <el-form-item
        label="联系人"
        style="width:30%"
      >
        <el-input v-model="contacts"></el-input>
      </el-form-item>
      <el-form-item
        label="联系电话"
        style="width:30%"
      >
        <el-input v-model="telephone"></el-input>
      </el-form-item>
      <el-form-item
        label="网点库存" v-if="this.$route.params.id!='no'"
        style="width:900px"
      >
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="商品id">
          </el-table-column>
          <el-table-column
            prop="short_name"
            label="商品简称">
          </el-table-column>
          <el-table-column
            prop="start_num"
            label="商品初始库存"
          >
          </el-table-column>
        </el-table>
        <el-button type="primary"  @click="lookTime" style="margin-top: 30px;">物流时间管理</el-button>
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
      id:this.$route.params.id,
      name:'',
      sort:'',
      clickDq:[],
      dq:[],
      contacts:'',
      telephone:'',
      short_name:'',
      address:'',
      proo: {
        value: "id",
        label: "name",
        children: "get_city"
      },
      tableData: []
    }},
    created(){
      let _this = this;
      this.axios.get('http://shede.sinmore.vip/api/citylist')
        .then(function (response) {
          _this.dq = response.data.data;
        })
        .catch(function (response) {
          console.log(response);
        });
      if (this.$route.params.id!='add'){
        let _this = this;
        this.axios.get('http://shede.sinmore.vip/api/admin/website/edit?website_id='+this.$route.params.id+'&token=000')
          .then(function (response) {
            let data = response.data.data;
            console.log(data);
            _this.contacts = data.contacts;
            _this.clickDq[0] = data.province_id;
            _this.clickDq[1] = data.city_id;
            _this.clickDq[2] = data.area_id;
            _this.name = data.name;
            _this.short_name = data.short_name;
            _this.telephone = data.telephone;
            _this.address = data.address;

          })
          .catch(function (response) {
            console.log(response);
          });
        this.axios.get('http://shede.sinmore.vip/api/admin/website/goodsStock?website_id='+this.$route.params.id+'&token=000')
          .then(function (response) {
            console.log(response);
            _this.tableData = response.data.data.goods;
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    },
    methods:{
      submitForm(){
        let _this = this;
        let url = '/api/admin/website/store'
        var obj ={
          name: _this.name,
          short_name:_this.short_name,
          province_id:_this.clickDq[0],
          city_id:_this.clickDq[1],
          area_id:_this.clickDq[2],
          address:_this.address,
          contacts:_this.contacts,
          telephone:_this.telephone,
        };
        if (this.$route.params.id!='no'){
          obj.website_id = this.$route.params.id;
          url = '/api/admin/website/update';
        }
        this.postFetch(url, obj,
          function (data) {
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            }else {
              _this.$router.push({path: '/branchList/add'});
            }
          },
          function (e) {
            console.log(e)
          }
        )
      },
      resetForm(n){
        console.log();
//        /api/admin/website/destory
        let _this = this;
        this.$confirm('此操作将永久删除该网点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          _this.postFetch('/api/admin/website/destory',{
            website_id:this.id
          },function(data){
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            }else {
              _this.$router.push({path: '/branchList/add'});
            }
          },function(){
          })
        }).catch(() => {
        });
      },
      lookTime(){
        window.open('/#/logisticsDetail/'+this.id+'')
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>

