<template>
  <div>
    <router-link to="/addAdmin/add" target="_blank">
      <el-button type="primary">添加管理员</el-button>
    </router-link>

    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="username"
        label="管理员名称"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"                  prop="creat_time"
      >
      </el-table-column>
      <el-table-column
        label="状态">
        <template scope="scope">
          {{(scope.row.status == 1)?'可用':'停用'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="auth"
        label="所属管理员群组"

      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template scope="scope">
          <el-button type="primary"  v-if="scope.row.status == 1" @click="change(scope,2)">冻结</el-button>
          <el-button type="primary" v-if="scope.row.status == 2" @click="change(scope,1)">正常</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="delClick(scope)">删除</el-button>
          <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    filters: {
      formatDate(time) {
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    name: "adminTeam",
    data() {
      return {
        tableData: [],
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/api/admin/auth/getadmin', {}, function (data) {
        console.log(data)
        _this.tableData = data.data;
      })
    },
    methods: {
      delClick(s){
        let _this = this;
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/auth/deladmin',
            {del_admin_id: s.row.id},
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
      edit(s){
        window.open('/#/addAdmin/'+s.row.id+'')
      },
      change(s,n){
        let obj = '';
        let _this = this;
        this.postFetch('/api/admin/auth/frozen',
          {fr_admin_id: s.row.id,type:n},
          function (data) {
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            } else {
              window.location.reload();
            }
          },
          function (e) {
            console.log(e)
          }
        )
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
