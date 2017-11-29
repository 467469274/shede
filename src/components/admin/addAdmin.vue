<template>
  <div>
    <div v-if="adminGroupArr!=''">
      <el-form label-width="120px" style="width:60%" label-position="left">
        <el-form-item label="管理员名字">
          <el-input v-model="user_name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="uname" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号">
          <el-input v-model="mobile" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-radio class="radio" v-model="ateam" :label="item.id" v-for="(item,index) in adminGroupArr">{{item.name}}
          </el-radio>
        </el-form-item>
        <el-form-item label="登录用户名">
          <el-input v-model="login_name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="password" style="width:30%"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button v-if="id>0" @click="delClick">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span v-if="adminGroupArr==''">请添加若干管理组</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "addadmin",
    data() {
      return {
        pId: this.$route.params.id,
        id: 0,
        adminGroupArr: [],
        state1: '',
        user_name: '',
        mobile: '',
        ateam:'',
        login_name: '',
        password: '',
        uname: ''
      }
    },
    created() {
      let _this = this;
      _this.postFetch('/api/admin/auth/getauthgroup', {}, function (data) {
        _this.adminGroupArr = data.data;
        console.log(data.data)
      });
      if (_this.$route.params.id != 'add') {
        _this.postFetch('/api/admin/auth/editadmin', {id: _this.$route.params.id}, function (datas) {
          let data = datas.data;
          console.log(data);
          _this.user_name = data.name;
          _this.uname = data.nickname;
          _this.mobile = data.mobile;
          _this.ateam =parseInt(data.auth_id);
          _this.login_name = data.username;
          _this.password = data.password;
        })
      }
    },
    methods: {
      delClick() {
        let _this = this;
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/auth/deladmin\n',
            {del_admin_id: _this.$route.params.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
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
      save() {
        let _this = this;
        let obj = {
          username:_this.login_name,
          name:_this.user_name,
          mobile:_this.mobile,
          nickname:_this.uname,
          password:_this.password,
          auth_id : _this.ateam
      };
        let url;
        if (_this.$route.params.id!='add'){
          url ='/api/admin/auth/updateadmin'
          obj.id = _this.$route.params.id
        }else{
          url ='/api/admin/auth/addadmin'

        }
        _this.postFetch(url, obj, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            _this.$message({
              type: 'success',
              message: '' + data.error_msg + ''
            });
            _this.$router.push({path: '/adminList'});
          }
        })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
