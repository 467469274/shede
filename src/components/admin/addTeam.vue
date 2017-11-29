<template>
  <div>
    <el-form label-width="120px" label-position="left">
      <el-form-item label="管理组名称" style="width:30%">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="管理组介绍" style="width:30%">
        <el-input type="textarea" v-model="info"></el-input>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="type">
          <el-checkbox :label=item.id name="type" v-for="(item,index) in checkArr"
                       style="display: inline-block;width:25%">
            {{item.privilege}}{{item.id}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存
        </el-button>
        <el-button type="danger" @click="del" v-if="this.$route.params.id>0">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default{
    name: "addTeam",
    data() {
      return {
        id: 0,
        radio: '',
        name: '',
        info: '',
        type: [],
        checkArr: []
      }
    },
    created(){
      let _this = this;
      let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
      _this.axios.get('http://shede.sinmore.vip/api/admin/auth/getauthlist?token='+token)
        .then(function (response) {

          if(response.data.error_code == 8){
            alert(response.data.error_msg);
            return;
          }
          _this.checkArr = response.data.data;
        })
        .catch(function (response) {
          console.log(response);
        });
      if (this.$route.params.id != 'add') {
        _this.postFetch('/api/admin/auth/editauthgroup', {
          id: _this.$route.params.id
        }, function (data) {
          console.log(data)
          _this.id = data.data.id;
          _this.name = data.data.group_name;
          _this.info = data.data.description;
          if (data.data.authorities>0){
            _this.type.push(data.data.authorities)
          }else{
            let ars = data.data.authorities.split(/\D/);
            let numArs = [];
            for (let i = 0;i<ars.length;i++){
              numArs.push(parseInt(ars[i]))
            }
            _this.type = numArs
          }
        })
      }
    },
    computed:{
   /*   ...mapGetters([
        "userData"
      ])*/
    },
    methods: {
      save(){
        let _this = this;
        let obj = {
          group_name:_this.name,
          description:_this.info,
          authorities:_this.type.join(",")
        };
        let url = '/api/admin/auth/addauthgroup';
        if(this.$route.params.id != 'add'){
          url = '/api/admin/auth/updateauthgroup'
          obj.id = this.$route.params.id
        }
        _this.postFetch(url, obj, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          }else {
            _this.$router.push({path: '/adminTeamList'});
          }
        })
      },
      del(){
        let _this = this;
        this.$confirm('此操作将永久删除该管理组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/auth/delauthgroup',
            {id: _this.$route.params.id},
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
                })
                _this.$router.push({path: '/adminTeamList'});
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      }
    }
  }
</script>
