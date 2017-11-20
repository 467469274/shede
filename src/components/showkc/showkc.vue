<template>

  <el-table
    :data="tableData"
    style="width:100%;margin-top:28px">
    <el-table-column
      prop="id"
      label="商品id"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
    >
    </el-table-column>
    <el-table-column
      label="押金"
      prop="deposit"
    >
    </el-table-column>
    <el-table-column
      label="起租价格"
      prop="start_price"
    >
    </el-table-column>
    <el-table-column
      label="起租天数"
      prop="start_days"
    >
    </el-table-column>
    <el-table-column
      label="续租价格"
      prop="keep_price"
    >
    </el-table-column>
    <el-table-column
      label="商品状态"
    >
      <template scope="scope">
        <span v-if="scope.row.status ==1">上架</span>
        <span v-if="scope.row.status ==0">下架</span>
      </template>
    </el-table-column>
    <el-table-column
      label="排序"
      prop="sort"
    >
    </el-table-column>

  </el-table>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'showkc',
      data(){
        return{
          tableData:[]
        }
      },
      created(){
        let _this= this;
        this.axios.get('http://shede.sinmore.vip/api/admin/goods/websiteStock?token=000&goods_id'+_this.$route.params.id)
          .then(function (response) {
            console.log(response);
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
</style>
