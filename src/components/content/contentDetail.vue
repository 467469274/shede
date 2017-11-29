<template>
  <div>
    <el-form label-position="left" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="内容标题" style="width:30%">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item
        label="发布人"
        style="width:30%"
      >
        <el-input v-model="publisher"></el-input>
      </el-form-item>
      <el-form-item
        label="文本位置"
        style="width:30%"
      >
        <el-select v-model="location" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="排序"
        style="width:30%"
      >
        <el-input v-model="sort"></el-input>
      </el-form-item>
      <el-form-item
        label="预览次数"
        style="width:30%"
      >
        {{browse}}
      </el-form-item>
      <el-form-item
        label="随机预览数"
        style="width:30%"
      >
        <el-input v-model="is_browse"></el-input>
      </el-form-item>
      <el-form-item
        label="发布时间"
        style="width:30%"
      >
        {{created_at}}
      </el-form-item>
      <el-form-item
        label="更新时间"
        style="width:30%"
      >
        {{updated_at}}
      </el-form-item>
      <el-form-item
        label="封面图"
        style="width:30%"
      >
        <el-upload
          class="avatar-uploader"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'content'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg"
               class="avatar">
          <span v-else
                class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="文本地址"
        style="width:30%"
      >
        <el-input v-model="link"></el-input>
      </el-form-item>
      <el-form-item
        label="文本内容"
        style="width:30%"
      >
        <editor ref="myTextEditor"
                :fileName="'image'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="moren">
        </editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存
        </el-button>
        <el-button type="danger" @click="resetForm()"
                   v-if="this.$route.params.id!='add'">删除
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import editor from 'components/quilleditor/Quilleditor.vue';
  export default{
    name: 'contentDetail',
    data(){
      return {
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: 'http://shede.sinmore.vip/api/storeImage',
        canCrop: false,
        imageUrl: '',
        location: '',
        moren: '  ',
        title: '',
        options: [{
          value: '1',
          label: '首页'
        }, {
          value: '2',
          label: '其他'
        }],
        updated_at: '',
        sort: '',
        link: '',
        is_browse:parseInt(Math.random()*1000),
        browse: '0',
        id: '',
        created_at: '',
        publisher: '',
        showImg:''
      }
    },
    created(){
      if (this.$route.params.id != 'no') {
        let _this = this;
        _this.postFetch('/api/admin/content/editContent', {
          con_id: _this.$route.params.id
        }, function (data) {
          console.log(data);
          _this.title = data.data.title;
          _this.updated_at = data.data.updated_at;
          _this.sort = data.data.sort;
          _this.imageUrl = data.data.pic_url;
          _this.link = data.data.link;
          _this.is_browse = data.data.is_browse;
          _this.browse = data.data.browse;
          _this.id = data.data.id;
          _this.created_at = data.data.created_at;
          _this.moren = data.data.content;
          _this.publisher = data.data.publisher;
          _this.location = '' + data.data.text_location + '';
        })
      }
    },
    watch: {
      imageUrl(){
//        showImg
        this.showImg =  'http://shede.sinmore.vip/storage/content/' + this.imageUrl
      }
    },
    methods: {
      submitForm(){
        let _this = this;
        let obj = {
            title : _this.title,
            publisher:_this.publisher,
            link:_this.link,
            sort:_this.sort,
            browse:_this.is_browse,
            is_browse:_this.is_browse,
            pic:_this.imageUrl,
            content:_this.moren,
            text_location:_this.location
          },
          url = '/api/admin/content/addContent';
        if (this.$route.params.id != 'no'){
          url ='/api/admin/content/upContent';
          obj.con_id = this.$route.params.id;
        }
        _this.postFetch(url,obj, function (data) {

          if (data.error_code === 0) {
            _this.$router.push({path: '/contentList'});
          }else {
            _this.$notify.error({
              title: '错误',
              message: data.error_msg
            });
          }
        })
      },
      resetForm(){
        let _this = this;
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/content/delContent', {con_id: _this.id},
            function (data) {
              console.log(data)
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
      handleAvatarSuccess(se){
        console.log(se)
        this.imageUrl = se.data.filename;
      }
    },
    components: {
      editor
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>
