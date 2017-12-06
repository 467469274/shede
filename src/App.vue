<template>
  <div>
    <div v-if="!show">
      <header>
        <div class="inner">
          <div class="login-logo"></div>
        </div>
      </header>
      <div class="main">
        <div class="inner">
          <div class="mainLeft"></div>
          <div class="mainRight">
            <p class="login-Title">
              欢迎进入新墨后台系统
            </p>
            <input type="text" placeholder="请输入您的用户名"
                   v-model="userName">
            <input type="password" placeholder="请输入您的登录密码"
                   v-model="pwd">
            <a class="login-btn" @click="login">登录</a>
          </div>
        </div>
      </div>
      <footer>
        <div class="inner">
          <p>网站地图 | 友情链接 新墨（北京）科技有限公司 All Rights Reserved
            京ICP备16057764号</p>
          <p>地址：丰台区宋家庄苇子坑149号庄子商务楼北楼一层新墨公司
            电话：010-80444845</p>
        </div>
      </footer>
    </div>
    <div class="stageWarp" v-if="show">
      <div class="header">
        <headerText></headerText>
        <div class="user">
          欢迎您！{{myname}}<a @click="checkOut">退出登录</a></div>
      </div>
      <div class="sidebar">
        <div class="logo">共好电商后台</div>
        <el-menu default-active="2"
                 class="navself el-menu-vertical-demo">
          <el-submenu  index="1">
            <template slot="title">
              资讯管理
            </template>
            <el-menu-item index="1-1" class="se">
              <router-link to="/bannerList"
                           class="routerLink">
                banner列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="1-2" class="se">
              <router-link to="/contentList"
                           class="routerLink">
                内容列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu  index="2">
            <template slot="title">
              商品管理
            </template>
            <el-menu-item index="2-1" class="se">
              <router-link to="/labelAd"
                           class="routerLink">
                标签管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-2" class="se">
              <router-link to="/branchList/add"
                           class="routerLink">
                网点管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-3" class="se">
              <router-link to="/equipmentList/no"
                           class="routerLink">
                设备管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-4" class="se">
              <router-link to="/commentList/peo/0"
                           class="routerLink">
                评论列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-4" class="se">
              <router-link to="/commodityList/no/no"
                           class="routerLink">
                商品管理
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu  index="3">
            <template slot="title">
              订单管理
            </template>
            <el-menu-item index="3-1" class="se">
              <router-link to="/orderList"
                           class="routerLink">
                订单列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <router-link class="routerLink"
                           to="">权限管理
              </router-link>
            </template>
            <el-menu-item index="7-2" class="se">
              <router-link class="routerLink"
                           to="/adminList">管理员管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="7-2" class="se">
              <router-link class="routerLink"
                           to="/adminTeamList">
                管理员组管理
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu  index="5">
            <template slot="title">
              会员管理
            </template>
            <el-menu-item index="3-1" class="se">
              <router-link to="/menberList/no"
                           class="routerLink">
                会员列表
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main">
        <router-view class="view"></router-view>
      </div>
      <div class="footer">
        本系统由 新墨 提供技术支持
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState,mapActions,mapGetters} from 'vuex';
  function delAllCookie(){
    var myDate=new Date();
    myDate.setTime(-1000);//设置时间
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
      var varName=dataArray[i].split("=");
      document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();
    }

  }
  function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + JSON.stringify(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
  }
  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }
  import Vue from 'vue';
  import headerText from './components/headerText/headerText.vue'
  export default {
    name: 'app',
    data(){
      return {
        loginSuccess: false,
        radio: '1',
        userName: '',
        pwd: '',
        show: false,
        myname:''
      }
    },
    created(){
      let userCookie = getCookie('userCookie');
      if (userCookie != null && userCookie != "") {
        let user = JSON.parse(userCookie);
//        user = JSON.parse(user)
        this.show = true;
        this.myname = user.name
      }
    },
    methods: {
      login(){
        if (this.userName == '') {
          this.$message({
            type: 'warning',
            message: '请输入用户名'
          });
        } else if (this.pwd == '') {
          this.$message({
            type: 'warning',
            message: '请输入密码'
          });
        } else {
          let _this = this;
          _this.postFetch('/api/adminLogin', {
            username: _this.userName,
            password: _this.pwd
          }, function (data) {
            if (data.error_code != 0) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            } else {
              setCookie('userCookie',JSON.stringify(data.data))
              _this.show = true;
            }
          })
        }
      },clearCookie(){
        let keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (let i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
        }
      },
      checkOut(){
//        /api/adminOut
        let _this = this;
        _this.postFetch('/api/adminOut',{}, function (data) {
          if (data.error_code != 0) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
            _this.clearCookie();
            location.reload();
          } else {
            _this.clearCookie();
            location.reload();
          }
        })
      }
    },
    components: {
      headerText
    },
    mounted() {
      let _this = this;
      document.onkeydown = function (e) {
        if (!_this.show){
          if (e && e.keyCode == 13) {
            _this.login()
          }
        }
      }
    },
    computed: {
    }
  }
</script>
<style>
  @import "../static/css/index/index.css";
  @import "../static/css/index/navself.css";
  @import "../static/css/login/css/common.css";
  @import "../static/css/login/css/gxkgg.css";
  @import "../static/css/login/css/login.css";
</style>
