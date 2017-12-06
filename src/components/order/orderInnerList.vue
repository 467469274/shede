<template>
  <div>

    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="short_name"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        prop="browse"
        label="设备"
      >
      </el-table-column>
      <el-table-column
        prop="equipment_color"
        label="颜色"
      >
      </el-table-column>
      <el-table-column
        prop="goods_rent"
        label="租金合计"
      >
      </el-table-column>
      <el-table-column
        prop="goods_deposit"
        label="押金"
      >
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="go(scope)">档期查询</el-button>
          <el-button type="text" size="small" @click="go(scope)">查看评价</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'orderInnerList',
      data(){
        return{
          tableData:[]
        }
      },
      created(){
        let _this = this;
        _this.postFetch('/admin/order/goods', {
          order_id:_this.$route.params.id
        }, function (data) {
          console.log(data.data.goods)
          _this.tableData = data.data.goods;
        }, function () {
        })
      },
      methods:{
        go(){
          window.open('/#/showpq/'+this.$route.params.id)
        }
      }
    }
</script>
<style>
</style>
