<template>
  <div>
    <router-link  to="/equipmentDetail/add" target="_blank"> <el-button type="primary">添加设备</el-button></router-link>
    <el-input placeholder="请输入内容" v-model="searchVal" class="sou" style="margin-bottom:20px;width:450px;float:right;margin-right:30%">
      <el-button slot="append" icon="search" @click="search">搜索</el-button>
    </el-input>
    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="equipment_id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="short_name"
        label="设备简称"
      >
      </el-table-column>
      <el-table-column
        label="设备序列号"
        prop="number"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
      >
        <template scope="scope">
          {{scope.row.created_at | formatDate}}
        </template>
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
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    name:"bannerList",

    data() {
      return {
        tableData: [],
        total:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        p:1,
        searchVal:(this.$route.params.id!='no')?this.$route.params.id:"",
        pageSize:50
      }
    },
    created(){
      this.getData()
    },
    methods: {
      bianji(s){
        window.open('/#/equipmentDetail/' + s.row.equipment_id + '')
      },
      del(s){
        let _this = this;
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/equipment/destory',{equipment_id:s.row.equipment_id},
            function (data) {
              console.log(data)
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
        let sea = '';
        if (_this.searchVal!='no'){
          sea = '&number='+_this.searchVal;
        }
        let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
        let url = 'http://shede.sinmore.vip/api/admin/equipment/index?token='+token+'&page='+_this.p+'&pagesize='+_this.pageSize+sea;
        this.axios.get(url)
          .then(function (response) {

            if(response.data.error_code == 8){
              alert(response.data.error_msg);
              return;
            }
            _this.tableData = response.data.data.list
            _this.total = response.data.data.total
            console.log(response)
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      search(){
        if (this.searchVal==''){
          this.$message({
            type: 'warning',
            message: '请填写搜索值'
          });
        }else {
          window.open('/#/equipmentList/' + this.searchVal + '')
        }
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
