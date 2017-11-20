<template>
  <div>
    <router-link  to="/labelAdd/no" target="_blank"> <el-button type="primary">添加标签</el-button></router-link>

    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="label_id"
        label="id"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="标签名称"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
      >
        <template scope="scope">
          {{scope.row.created_at |formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope)">删除</el-button>
          <el-button type="text" size="small" @click="bianji(scope)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total" style="display: inline-block">
      </el-pagination><span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    name:"bannerList",
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        tableData: [],
        total:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        p:1,
        pageSize:50
      }
    },
    created(){
      this.getData()
    },
    methods: {
      bianji(s){
        window.open('/#/labelAdd/' + s.row.label_id + '')
      },
      del(s){
        let _this = this;
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/labels/destory',{label_id:s.row.label_id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(s.$index, 1);
                _this.$message({
                  type: 'success',
                  message: '已删除'
                });
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.p = val;
        this.getData()
      },
      getData(){
        let _this = this;
        /*
         _this.postFetch('/api/admin/labels/index',{
         page:_this.p,
         pagesize:_this.pageSize
         },function(data){
         _this.tableData = data.data.data;
         _this.total = data.data.total
         },function(){
         })*/
        this.axios.get('http://shede.sinmore.vip/api/admin/labels/index?page='+_this.p+'&pagesize='+_this.pageSize+'&token=000')
          .then(function (response) {
            console.log(response)
            _this.tableData = response.data.data.list;
            _this.total = response.data.data.total
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
