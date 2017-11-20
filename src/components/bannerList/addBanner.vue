<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Banner 名称"  style="width:30%">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="链接指向"
        style="width:30%"
      >
        <el-input v-model="link"></el-input>
      </el-form-item>
      <el-form-item
        label="排序"
        style="width:30%"
      >
        <el-input v-model="sortData"></el-input>
      </el-form-item>
      <el-form-item
        label="显示位置"
        style="width:30%"
      >主页
      </el-form-item>
      <el-form-item
        label="创建时间"
        style="width:30%"
      >{{created_at}}
      </el-form-item>
      <el-form-item
        label="更新时间"
        style="width:30%"
      >{{updated_at}}
      </el-form-item>
      <el-form-item
        label="点击次数"
        style="width:30%"
      >{{browse}}
      </el-form-item>
      <el-form-item
        label="图片"
        style="width:30%"
      >
        <el-upload
          class="avatar-uploader"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'banner'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm()">保存</el-button>
        <el-button type="danger" @click="resetForm()" v-if="this.$route.params.id!='add'">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:'bannerList',
    data(){
      return{
        imageUrl:'',
        name:'',
        link:'',
        browse:0,
        sortData:'',
        created_at:'',
        updated_at:''
      }
    },
    created(){
      if (this.$route.params.id!='add'){
        let _this = this;
        _this.postFetch('/api/admin/banner/editBanner',{
          ban_id:this.$route.params.id
        },function(data){
          console.log(data);
          _this.name = data.data.name;
          _this.link = data.data.link;
          _this.sortData = data.data.sort;
          _this.updated_at = data.data.updated_at;
          _this.imageUrl = data.data.pic_url;
          _this.browse = data.data.browse;
          _this.id = data.data.id;
          _this.created_at = data.data.created_at;
        })
      }
    },
    computed:{
      showImg(){
        return 'http://shede.sinmore.vip/storage/banner/'+this.imageUrl
      }
    },
    methods:{
      submitForm(){
        let _this = this;
        let obj = {
          name :_this.name,
          link : _this.link,
          sort :_this.sortData,
          pic: _this.imageUrl,
          browse : _this.browse,
          position:1
        };
        let url = '/api/admin/banner/addBanner';
        if (_this.$route.params.id != 'add'){
          url = '/api/admin/banner/upBanner';
          obj.ban_id =_this.id
        }
        _this.postFetch(url,obj,function(data){
          console.log(data)
          if (data.error_code == 0){
            _this.$router.push({path: '/bannerList'});
          }
        })
      },
      resetForm(){

      },
      handleAvatarSuccess(data,eee){
        console.log(data)
        this.imageUrl = data.data.filename;
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>
