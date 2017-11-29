<template>
  <div class="commodityDetail">
    <p v-if="this.$route.params.id!='add'"><a :href='"/#/commodityDetail/"+this.$route.params.id'>商品基础信息</a>
      &nbsp;&nbsp;&nbsp;<a :href='"/#/showkc/"+this.$route.params.id'>网店库存</a>
      &nbsp;&nbsp;&nbsp;<a :href='"/#/course/"+this.$route.params.id'>相关教程</a></p>
    <el-form label-position="left" label-width="150px"
             class="demo-ruleForm">
      <el-form-item label="当前状态" style="padding-left: 20px">
        <el-radio v-model="status" label="0">下架</el-radio>
        <el-radio v-model="status" label="1">上架</el-radio>
      </el-form-item>
      <el-form-item label="商品标题" style="padding-left: 20px">
        <el-input v-model="name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品简称" style="padding-left: 20px">
        <el-input v-model="sortName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="排序" style="padding-left: 20px">
        <el-input v-model="srot" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="图组" style="padding-left: 20px">
        <el-upload
          class="upload-demo"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'comment'}"
          :file-list="fileList2"
          :on-remove="remove"
          :on-success="handleAvatarSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签" style="padding-left: 20px">
        <el-checkbox-group v-model="labal">
          <el-checkbox :key="index" :label=item.label_id v-for="(item,index) in labals">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="起租价" style="padding-left: 20px">
        <el-input v-model="startPrice" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="起租天数" style="padding-left: 20px">
        <el-input v-model="startDay" placeholder="起租天数"></el-input>
      </el-form-item>
      <el-form-item label="续租价" style="padding-left: 20px">
        <el-input v-model="xzPrice" placeholder="/ 元 / 天"></el-input>
      </el-form-item>
      <el-form-item label="月租价" style="padding-left: 20px">
        <el-input v-model="mouPrice" placeholder="/ 元 / 天"></el-input>
      </el-form-item>
      <el-form-item label="押金" style="padding-left: 20px">
        <el-input v-model="yj" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="商品浏览量" style="padding-left: 20px">
        {{lookNum}}
      </el-form-item>
      <el-form-item label="附加浏览量" style="padding-left: 20px">
        <el-input v-model="addLookNum" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="商品销售量" style="padding-left: 20px">
        {{sellNum}}
      </el-form-item>
      <el-form-item label="附加浏览量" style="padding-left: 20px">
        <el-input v-model="addLookNum" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="商品详情" style="padding-left: 20px">
        <editor ref="myTextEditor"
                :fileName="'image'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="moren">
        </editor>
      </el-form-item>
    </el-form>
    <el-button size="small" type="primary" @click="save">保存</el-button>
    <el-button size="small" type="primary" @click="del" v-if="this.$route.params.id!='add'">删除</el-button>

  </div>
</template>
<script type="text/ecmascript-6">
  import editor from 'components/quilleditor/Quilleditor.vue';

  export default {
    name: 'commodityDetail',
    components: {
      editor
    },
    data() {
      return {
        moren: '',
        uploadUrl: 'http://shede.sinmore.vip/api/storeImage',
        canCrop: false,
        status: '0',
        name: '',
        sortName: '',
        fileList2: [],
        labal: [],
        startPrice: 0,
        startDay: 0,
        xzPrice: "",
        mouPrice: '',
        yj: 0,
        lookNum: '',
        addLookNum: Math.floor(Math.random() * 900) + 100,
        sellNum: '',
        addSellNum: Math.floor(Math.random() * 900) + 100,
        labals: [],
        srot:''
      }
    },
    created() {
      this.getLabal()
    },
    methods: {
      handleAvatarSuccess(re) {
        this.fileList2.push({
          name: re.data.filename,
          url: re.data.url
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
      getLabal() {
        let _this = this;
        let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
        this.axios.get('http://shede.sinmore.vip/api/admin/labels/index?page=1&pagesize=1000&token='+token)
          .then(function (labaldata) {


            if(labaldata.data.error_code == 8){
              alert(labaldata.data.error_msg);
              return;
            }
            _this.labals = labaldata.data.data.list;
            if(_this.$route.params.id!='add'){
              let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
              _this.axios.get('http://shede.sinmore.vip/api/admin/goods/edit?token='+token+'&goods_id='+_this.$route.params.id)
                .then(function (datar) {

                  if(datar.data.error_code == 8){
                    alert(datar.data.error_msg);
                    return;
                  }
                  let data = datar.data.data;
                  _this.name = data.name;
                  _this.sortName = data.short_name;
                  _this.yj = data.deposit;
                  _this.startPrice = data.start_price;
                  _this.startDay = data.start_days;
                  _this.xzPrice = data.keep_price;
                  _this.mouPrice = data.monthly_price;
                  _this.srot = data.sort;
                  _this.addLookNum = data.attach_num;
                  _this.moren = data.detail;
                  _this.status = ''+data.status+'';
                  let ars = [];
                  for (let i = 0;i<data.labels.length;i++){
                    ars.push(data.labels[i].label_id)
                  }
                  _this.labal = ars;
                  let picArs = [];
                  for (let i = 0;i<data.pics.length;i++){
                    let obj = {
                      name:data.pics[i].file_name,
                      url:data.pics[i].pic_url
                    }
                    picArs.push(obj)
                  }
                  _this.fileList2 = picArs;
                })
                .catch(function () {
                });
            }
          })
          .catch(function () {
          });
      },
      save(){
        let _this = this;
        let obj = {
          name:_this.name,
          short_name:_this.sortName,
          sort:_this.srot,
          goods_label:_this.labal,
          deposit:_this.yj,
          start_price:_this.startPrice,
          start_days:_this.startDay,
          keep_price:_this.xzPrice,
          monthly_price:_this.mouPrice,
          attach_num:_this.addLookNum,
          detail:_this.moren,
          status:_this.status
        };
        let picList = [];
        for (let i = 0;i<_this.fileList2.length;i++){
          picList.push([_this.fileList2[i].url,parseInt(Math.random()*10000)+'dddqd'])
        }
        console.log(picList)
        obj.goods_pic = picList;
        let url = '/api/admin/goods/store';
        if(_this.$route.params.id!='add'){
          url = '/api/admin/goods/update';
          obj.goods_id = _this.$route.params.id;
        }
        this.postFetch(url,obj,
          function (data) {
            if (data.error_code === 0) {
              _this.$router.push({path: '/commodityList/no/no'});
            }else {
              _this.$notify.error({
                title: '错误',
                message: data.error_msg
              });
            }
          },
          function (e) {
            console.log(e)
          }
        )
      },
      del(){
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/comments/del',{comment_id:_this.$route.params.id},
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
                _this.$router.push({path: '/commodityList/no/no'});
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
<style>

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
