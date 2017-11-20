<template>
  <div>
    <router-link  to="/branchDetail/no" target="_blank">
      <el-button type="primary" style="float:left">网点添加</el-button>
    </router-link>
    <el-input placeholder="请输入内容" v-model="searchVal" class="sou" style="margin-bottom:20px;width:450px;float:right;margin-right:30%">
      <el-button slot="append" icon="search" @click="search">搜索</el-button>
    </el-input>

    <el-table
      :data="tableData"
      style="width:100%;clear:both">
      <el-table-column
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="网点名称"
      >
      </el-table-column>
      <el-table-column
        prop="short_name"
        label="网点简称"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="网点地址"
      >
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="contacts"
      >
      </el-table-column>
      <el-table-column
        label="电话"
        prop="telephone"
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
        prop="handle"
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
    name:"branchList",
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
        searchVal:this.$route.params.id,
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
        window.open('/#/branchDetail/' + s.row.id + '')
      },
      del(s){
        let _this = this;
        this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/website/destory',
            {website_id:s.row.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(s.$index, 1);
                this.$message({
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
      search(){
        if (this.searchVal==''){
          this.$message({
            type: 'warning',
            message: '请填写搜索值'
          });
        }else {
          window.open('/#/branchList/' + this.searchVal + '')
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.p = val;
        this.getData()
      },
      getData(){
        let _this = this;
        var url = 'http://shede.sinmore.vip/api/admin/website/index?page='+_this.p+'&pagesize='+_this.pageSize+'&token=000';
        if (_this.searchVal!='add'){
          url = 'http://shede.sinmore.vip/api/admin/website/index?page='+_this.p+'&pagesize='+_this.pageSize+'&token=000&name='+_this.searchVal+'';
        }
        this.axios.get(url)
          .then(function (response) {
            _this.tableData = response.data.data.websites;
            _this.total = response.data.data.total;
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
