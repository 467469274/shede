<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="关联商品"
        style="width:30%"
      >
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="设备名称"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备简称"
        style="width:30%"
      >
        <el-input v-model="short_name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备价值"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备串号1"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备串号2"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备串号3"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备颜色"
        style="width:30%"
      >
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item
        label="设备描述"
        style="width:30%"
      ><el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        chose:'',
        has_many_pics:[],
        archives:'',
        color:'',
        goods_id:'',
        number_three:'',
        number_two:'',
        number:'',
        short_name:'',
        name:''
      }
    },
    created(){
//
      if (this.$route.params.id!='add'){
        let _this = this;
        this.axios.get('http://shede.sinmore.vip/api/admin/equipment/edit?token=000&equipment_id='+_this.$route.params.id+'')
          .then(function (response) {
            let data =response.data.data;
            _this.name = data.name;
            _this.short_name = data.short_name;
            _this.number = data.number;
            _this.number_two = data.number_two;
            _this.number_three = data.number_three;
            _this.goods_id = data.goods_id;
            _this.color = data.color;
            _this.archives = data.archives;
            _this.has_many_pics = data.has_many_pics;
          })
          .catch(function (response) {
            console.log(response);
          });
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
