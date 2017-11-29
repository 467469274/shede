<template>
  <div>
    <el-button type="primary" @click="ht" v-if="this.$route.params.type=='peo'">后台评论</el-button>
    <router-link  to="/commentDetail/add/server" target="_blank" style="width: 20%" v-if="this.$route.params.type!='peo'"> <el-button type="primary">添加评论</el-button></router-link>

    <el-form label-position="left" class="demo-ruleForm" style="width: 50%;display: inline-block">
      <el-date-picker
        v-model="dates"
        type="daterange"
        align="right"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2" style="display: inline-block">
      </el-date-picker>
      <el-input v-model="search"style="display: inline-block;width: 300px"></el-input>
      <el-button type="primary" @click="searchs">搜索</el-button>
    </el-form>
    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="order_sn"
        label="订单号"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="goods_short_name"
        label="商品简称"
      >
      </el-table-column>
      <el-table-column
        label="评分"
        prop="star"
      >
      </el-table-column>
      <el-table-column
        prop="member_name"
        label="用户昵称"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="评价时间"
      >
        <template scope="scope">
          {{scope.row.created_at |formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope)">删除</el-button>
          <el-button type="text" size="small" @click="bianji(scope)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    name:"bannerList",
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }},
    data() {
      return {
        dates:'',
        tableData: [],
        total:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        type:this.$route.params.type,
        p:1,
        pageSize:50,
        search:'',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created(){
      this.getData()
    },
    methods: {
      searchs(){
        window.open('/#/commentList/'+this.$route.params.type+'/' + this.search + '')
      },
      dateChange(data){
        console.log(data)
      },
      bianji(s){
        window.open('/#/commentDetail/' + s.row.comment_id + '/'+this.$route.params.type)
      },
      del(s){
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/comments/del',{comment_id:s.row.comment_id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(s.$index, 1);
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.p = val;
        this.getData()
      },
      getData(){
        let _this = this;
        let type = (_this.$route.params.type =='peo')?0:1;
        let searchData=''
        if (_this.$route.params.id!='' &&_this.$route.params.id!=0){
          if ( _this.$route.params.id.indexOf(',')>0){
            searchData = '&start_time='+_this.$route.params.id.split(/\D/)[0]/1000+'&end_time='+_this.$route.params.id.split(/\D/)[1]/1000+'';
          }else {
            searchData = '&keyword='+_this.$route.params.id;
          }
        }
        _this.axios.get('http://shede.sinmore.vip/api/admin/comments/index?page='+_this.p+'&pagesize='+_this.pageSize+'&token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token+'&data_source='+type+searchData+'')
          .then(function (response) {
            console.log(response)

            if(response.data.error_code == 8){
              alert(response.data.error_msg);
              return;
            }
            _this.tableData = response.data.data;
            _this.total = response.data.data.total;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      ht(){
        window.open('/#/commentList/server/0')
      }
    },
    watch:{
      dates(n){
        window.open('/#/commentList/peo/' + (+new Date(n[0])) + ','+(+new Date(n[1])));
      },
      type(){
        this.getData()
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
