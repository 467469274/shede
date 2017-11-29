<template>
  <div>
    <p v-if="this.$route.params.id!='add'"><a :href='"/#/commodityDetail/"+this.$route.params.id'>商品基础信息</a>
      &nbsp;&nbsp;&nbsp;<a :href='"/#/showkc/"+this.$route.params.id'>网店库存</a>
      &nbsp;&nbsp;&nbsp;<a :href='"/#/course/"+this.$route.params.id'>相关教程</a></p>
    <el-table
      :data="tabals"
      style="width:100%;margin-top:28px">
      <el-table-column
        prop="website_id"
        label="网点id"
      >      </el-table-column>
      <el-table-column
        prop="short_name"
        label="网点"
      >      </el-table-column>
      <el-table-column
        prop="start_num"
        label="库存"
      >
        <template scope="scope">
          <el-input v-model="scope.row.start_num" placeholder="请输入内容" @change="syChange(scope)"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="surplus_num"
        label="剩余库存"
      >
        <template scope="scope">
          <el-input v-model="scope.row.surplus_num" placeholder="请输入内容" @change="syChange(scope)"></el-input>
        </template>
      </el-table-column>
    </el-table>
    商品合计库存数量为：{{stock_sum.start_sum}}个，剩余库存为{{stock_sum.surplus_sum}}个。
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'showkc',
      data(){
        return{
          tabals:[],
          stock_sum:{}
        }
      },
      created(){
//        http://shede.sinmore.vip/api/admin/goods/websiteStock
        this.getData()

      },
      methods:{
        save(){
          console.log(this.tabals)
        },
        syChange(s){
          let data = s.row;
          let _this = this;
          if (data.start_num!=''||data.surplus_num!=''){
            let obj ={
              website_id:data.website_id,
              start_num:data.start_num,
              surplus_num:data.surplus_num,
              goods_id:_this.$route.params.id
            }
            this.postFetch('/api/admin/goods/setStock',obj,
              function (datas) {
                if (datas.error_code === 1) {
                  _this.$message({
                    type: 'warning',
                    message: '' + datas.error_msg + ''
                  });
                } else {
                  _this.$message({
                    type: 'success',
                    message: '保存成功'
                  });
                  _this.getData()
                }
              },
              function (e) {
                console.log(e)
              }
            )
          }
        },
        getData(){
          let _this = this;
          this.axios.get('http://shede.sinmore.vip/api/admin/goods/websiteStock?token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token+'&goods_id='+_this.$route.params.id)
            .then(function (labaldata) {
              console.log(labaldata);

              if(labaldata.data.error_code == 8){
                alert(response.data.error_msg)
              }
              _this.tabals = labaldata.data.data.websites;
              _this.stock_sum = labaldata.data.data.stock_sum;
              console.log(_this.stock_sum)
            })
            .catch(function () {
            });
        }
      }
    }
</script>
<style>
</style>
