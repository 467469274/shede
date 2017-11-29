<template>
  <div>
    <p style="font-size: 25px" v-if="!isAdd&&isType">基础信息</p>
    <el-form label-position="left" label-width="150px"
             class="demo-ruleForm"  v-if="!isAdd&&isType">
      <el-form-item label="订单编号" style="padding-left: 20px">
        {{order.order_sn}}
      </el-form-item>
      <el-form-item label="下单时间" style="padding-left: 20px">
        {{order.create_time}}
      </el-form-item>
      <el-form-item label="购买用户昵称" style="padding-left: 20px">
        {{datas.member_name}}
      </el-form-item>
    </el-form>
    <el-form label-position="left" label-width="150px" v-if="!isType">
      <el-form-item label="评论商品">
        <el-select v-model="god" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论人">
        <el-input v-model="commMan" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="commNum" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-position="left" label-width="150px" v-if="!isAdd&&isType">
      <el-form-item label=" " style="padding-left: 20px">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="goods_id"
            label="商品id">
          </el-table-column>
          <el-table-column
            prop="short_name"
            label="商品简称">
          </el-table-column>
          <el-table-column
            prop="tenancy"
            label="租期">
          </el-table-column>
          <el-table-column
            prop="rent"
            label="租金合计">
          </el-table-column>
          <el-table-column
            label="数量">
            <template scope="scope">
              1
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_rent"
            label="商品租金">
          </el-table-column>
          <el-table-column
            prop="goods_deposit"
            label="商品押金">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <p style="font-size: 25px">评论明细</p>
    <el-form label-position="left"
             class="demo-ruleForm">
      <el-form-item label=" ">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'banner'}"
          v-model="textarea">
        </el-input>
        <el-upload
          class="upload-demo"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'comment'}"
          :file-list="fileList2"
          :on-remove="remove"
          list-type="picture"
          :on-success="handleAvatarSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div slot="tip" class="el-upload__tip">可上传多张，支持JPG,PNG格式，单张大小请小于500KB</div>
      </el-form-item>
    </el-form>

    <el-button size="small" type="primary" @click="save">保存</el-button>
    <el-button size="small" type="primary" @click="del" v-if="this.$route.params.id!='add'">删除</el-button>
    <!--/api/admin/comments/del-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        textarea:'',
        tableData:[],
        datas:{},
        order:{},
        fileList2:[],
        isAdd:this.$route.params.id =='add',
        isType:this.$route.params.type!='server',
        options:[],
        god:'',
        commMan:'',
        commNum:''
      }
    },
    created(){
      let _this = this;
      let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
      this.axios.get('http://shede.sinmore.vip/api/admin/goods/index?token='+token+'&page=1&pagesize=10000')
        .then(function (gods) {

          if(gods.data.error_code == 8){
            alert(gods.data.error_msg)
          }
          _this.options = gods.data.data.list;
        })
        .catch(function (ree) {
          console.log(ree);
        });
      this.axios.get('http://shede.sinmore.vip/api/admin/comments/detail?comment_id='+this.$route.params.id+'&token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token)
        .then(function (response) {

          if(response.data.error_code == 8){
            alert(response.data.error_msg)
          }
          console.log(response.data.data)
          _this.datas = response.data.data;
          _this.order = response.data.data.order;
          _this.textarea = response.data.data.content;
          _this.tableData.push(response.data.data.order_goods);
          let pics = response.data.data.pics;
          let ars =[];
          for (let i = 0;i<pics.length;i++){
            let obj = {
              name:pics[i].pic_url,
              url:'http://shede.sinmore.vip/storage/comment/'+pics[i].pic_url
            }
            ars.push(obj)
          }
          _this.fileList2 = ars;

          if (!_this.isType){
            _this.god = response.data.data.goods_id
            _this.commMan = response.data.data.member_name
            _this.commNum = response.data.data.star
          }
        })
        .catch(function (response) {
          console.log(response);
        });

    },
    methods:{
      handleAvatarSuccess(re){
        this.fileList2.push({
          name: re.data.filename,
          url: re.data.url
        })
      },
      save(){
        let _this = this;
//
        let ars = [],
          picArs = _this.fileList2,
          url = '/api/admin/comments/add',
          obj = {};
        for (let i = 0;i<picArs.length;i++){
          ars.push(picArs[i].name)
        }

        if(!_this.isAdd){
          obj = {
            comment_id:_this.$route.params.id,
            goods_id:_this.tableData[0].goods_id,
            member_name:_this.datas.member_name,
            content:_this.datas.content,
            star:_this.datas.star,
            commentpic:ars
          };
          url = '/api/admin/comments/update'
        }else {
          obj = {
            goods_id:_this.god,
            member_name:_this.commMan,
            content:_this.textarea,
            star:_this.commNum,
            commentpic:ars
          }
        }
        console.log(obj)
        _this.postFetch(url,obj,function(data){
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          }else {
            _this.$router.push({path: '/commentList/'+_this.$route.params.type+'/0'});
          }
        })
      },
      remove(file, fileList){
        for (let i = 0; i < this.fileList2.length; i++) {
          if (this.fileList2[i].name === file.name) {
            this.fileList2.splice(i, 1)
          }
        }
        console.log(this.fileList2);
      },
      del(){
        let _this = this;
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
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
                _this.$router.push({path: '/commentList/peo/0'});
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      }
    },
    computed:{
    }
  }
</script>
<style>
  .el-upload-list__item img{
    width: 150px!important;
    height:  150px!important;
    z-index: -1;
    margin-left: 0!important;
  }
  .el-upload-list__item-status-label,.el-icon-close{
    z-index: 11;
  }
  .el-upload-list__item{
    width: 150px;
    height: 150px!important;
    display: inline-block;
    margin-right: 15px;
    padding: 0!important;
  }
  .el-upload-list__item-name{
    display: none!important;
  }
</style>
