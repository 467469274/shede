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
          欢迎您！<!--{{userData.user_name}}--><a>退出登录</a></div>
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
              <router-link to="/equipmentList/add"
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
              <router-link to="/commentList/server/0"
                           class="routerLink">
                后台评论
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
        show: true
      }
    },
    created(){
/*      let userCookie = getCookie('userCookie');
      if (userCookie != null && userCookie != "") {
        console.log('有缓存');
        this.getUser(userCookie);
        this.show = true;
        this.getList(JSON.parse(userCookie))
      }*/
    },
    methods: {
/*      login(){
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
          _this.postFetch('/admin/adminlogin', {
            loginname: _this.userName,
            password: _this.pwd
          }, function (data) {
            if (data.error_code == 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            } else {
              _this.show = true;
              setCookie('userCookie', data.data, 1);
              _this.getList(data.data)
            }
          })
        }
      },
      getList(objs){
//        let objs = JSON.parse(obj);
        let _this = this;
        _this.postFetch('/admin/sys/getSysMenuListByAdmin', {
          admin_id: objs.id
        }, function (data) {
          console.log(data);
          if(data.error_code == 0){
            for (let i = 0; i < data.data.length; i++) {
              switch (data.data[i].menu_name) {
                case '订单管理':
                  _this.ddgl = true;
                  break;
                case '会员管理':
                  _this.hygl = true;
                  break;
                case '商品管理':
                  _this.spgl = true;
                  break;
                case '分类管理':
                  _this.flgl = true;
                  break;
                case '评价管理-商品':
                  _this.plglsp = true;
                  break;
                case '评价管理-资讯':
                  _this.plglzx = true;
                  break;
                case '内容管理':
                  _this.nrgl = true;
                  break;
                case '商家管理':
                  _this.sjgl = true;
                  break;
                case '权限管理':
                  _this.qxgl = true;
                  break;
                case '热搜管理':
                  _this.rsgl = true;
                  break;
                case '版本管理':
                  _this.bbgl = true;
                  break;
                case '服务反馈表单':
                  _this.fwfkbd = true;
                  break;
                case '启动图管理':
                  _this.qdtgl = true;
                  break;
              }
            }
          }else {
            delAllCookie();
            window.location.reload()
          }
        })
      },
      ...mapActions([
        'getUser'
      ])*/
    },
    components: {
      headerText
    },
    computed: {
/*      ...mapGetters([
        "userData"
      ])*/
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
