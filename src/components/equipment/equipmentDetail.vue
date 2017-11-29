<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="关联商品"
        style="width:30%"
      >
        <el-select v-model="god" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
        label="设备串号1"
        style="width:30%"
      >
        <el-input v-model="number"></el-input>
      </el-form-item>
      <el-form-item
        label="设备串号2"
        style="width:30%"
      >
        <el-input v-model="number_two"></el-input>
      </el-form-item>
      <el-form-item
        label="设备串号3"
        style="width:30%"
      >
        <el-input v-model="number_three"></el-input>
      </el-form-item>
      <el-form-item
        label="设备颜色"
        style="width:30%"
      >
        <el-input v-model="color"></el-input>
      </el-form-item>
      <el-form-item
        label="设备价格"
        style="width:30%"
      >
        <el-input v-model="pricd"></el-input>
      </el-form-item>
      <el-form-item
        label="设备描述"
        style="width:30%"
      ><el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="abrasion">
      </el-input>
      </el-form-item>

      <el-form-item label="图组" style="padding-left: 20px">
        <el-upload
          class="upload-demo"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'equipment'}"
          :file-list="fileList2"
          :on-remove="remove"
          :on-success="handleAvatarSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情" style="padding-left: 20px">
        <editor ref="myTextEditor"
                :fileName="'image'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="moren">
        </editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm()">保存</el-button>
        <el-button type="danger" @click="resetForm()" v-if="this.$route.params.id!='add'">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import editor from 'components/quilleditor/Quilleditor.vue';
  export default{
    name:'bannerList',
    data(){
      return{
        moren:'',
        uploadUrl: 'http://shede.sinmore.vip/api/storeImage',
        canCrop: false,
        options: [],
        chose:'',
        has_many_pics:[],
        archives:'',
        pricd:'',
        color:'',
        goods_id:'',
        number_three:'',
        number_two:'',
        number:'',
        short_name:'',
        name:'',
        god:'',
        id:this.$route.params.id,
        fileList2:[],
        abrasion:''
      }
    },
    components:{
      editor
    },
    created(){
      let _this = this;
      let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
      this.axios.get('http://shede.sinmore.vip/api/admin/goods/index?token='+token+'&page=1&pagesize=10000')
        .then(function (gods) {

          if(gods.data.error_code == 8){
            alert(gods.data.error_msg);
            return;
          }
          _this.options = gods.data.data.list;
        })
        .catch(function (ree) {
          console.log(ree);
        });
      if (this.$route.params.id!='add'){
        let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
        this.axios.get('http://shede.sinmore.vip/api/admin/equipment/edit?token='+token+'&equipment_id='+_this.$route.params.id+'')
          .then(function (response) {

            if(response.data.error_code == 8){
              alert(response.data.error_msg);
              return;
            }
            let data =response.data.data;
            console.log(data)
            _this.name = data.name;
            _this.short_name = data.short_name;
            _this.number = data.number;
            _this.number_two = data.number_two;
            _this.number_three = data.number_three;
            _this.goods_id = data.goods_id;
            _this.color = data.color;
            _this.moren = data.archives;
            _this.has_many_pics = data.has_many_pics;
            _this.god = data.goods_id;
            _this.pricd = data.pricd;
            _this.abrasion = data.abrasion;
            let picList = [];
            for(let i = 0;i<data.has_many_pics.length;i++){
              picList.push({url:'http://shede.sinmore.vip/storage/equipment/'+data.has_many_pics[i].pic_url,name:data.has_many_pics[i].pic_url})
            }
            _this.fileList2 = picList;
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    },
    methods:{
      handleAvatarSuccess(re) {
        console.log(re)
        this.fileList2.push({
          name: re.data.filename,
          url: re.data.url
        })
      },
      submitForm(){
        let _this = this;
        let obj = {
          goods_id:_this.god,
          name:_this.name,
          number:_this.number,
          number_two:_this.number_two,
          number_three:_this.number_three,
          color:_this.color,
          archives:_this.moren,
          pricd:_this.pricd,
          short_name:_this.short_name,
          abrasion:_this.abrasion,
        };
        let photo = [];
        console.log(_this.fileList2)
        for (let i = 0;i<_this.fileList2.length;i++){
          console.log(_this.fileList2[i])
          photo.push(_this.fileList2[i].name);
        }
        obj.photo = photo;
        console.log(obj)
        let url = '/api/admin/equipment/store';
        if (_this.$route.params.id != 'add'){
          url = '/api/admin/equipment/update';
          obj.equipment_id =_this.id
        }
        _this.postFetch(url,obj,function(data){
          console.log(data);
          console.log(data)
          if (data.error_code == 0){
            _this.$router.push({path: '/equipmentList/no'});
          }
        })
      },
    remove(file, fileList) {
      for (let i = 0; i < this.fileList2.length; i++) {
        if (this.fileList2[i].name === file.name) {
          this.fileList2.splice(i, 1)
        }
      }
      console.log(this.fileList2);
    },
      resetForm(){

      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
  .el-upload-list__item img {
    width: 150px !important;
    height: 150px !important;
    z-index: -1;
    margin-left: 0 !important;
  }

  .el-upload-list__item-status-label, .el-icon-close {
    z-index: 11;
  }

  .el-upload-list__item {
    width: 150px;
    height: 150px !important;
    display: inline-block;
    margin-right: 15px;
    padding: 0 !important;
  }

  .el-upload-list__item-name {
    display: none !important;
  }
</style>
