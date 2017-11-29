<template>
  <div>
    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="id"
        label="id"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名称"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
      >
      </el-table-column>
      <el-table-column
        prop="province"
        label="所在省份"
      >
      </el-table-column>
      <el-table-column
        prop="city"
        label="所在城市"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="created_at">
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
      let u = '';
      if (this.$route.params.id!='no'){
        u = '&likename='+this.$route.params.id
      }
      this.axios.get('http://shede.sinmore.vip/api/admin/user/ListMember?offsetpage=1&token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token+''+u)
        .then(function (labaldata) {
          console.log(labaldata.data.data.userdata.data)
          if(labaldata.data.error_code == 8){
            alert(labaldata.data.error_msg);
            return;
          }
          _this.tableData = labaldata.data.data.userdata.data;
        })
        .catch(function () {
        });
    },
    methods: {
      delClick(s){
        let _this = this;
        this.$confirm('此操作将永久删除该管理组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/auth/delauthgroup',
            {id: s.row.id},
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
        window.open('/#/addTeam/'+s.row.id+'')
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
