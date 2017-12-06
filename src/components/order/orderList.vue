<template>
  <div>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item label="订单状态:"  style="width:90%">
        <el-checkbox v-model="checked" label="2">待确认</el-checkbox>
        <el-checkbox v-model="checked" label="4">待发货</el-checkbox>
        <el-checkbox v-model="checked" label="5">已发货</el-checkbox>
        <el-checkbox v-model="checked" label="11">已完成</el-checkbox>
        <span style="margin: 0 40px">网点:</span>
        <el-select v-model="wangdian" placeholder="请选择">
          <el-option
            v-for="item in cityOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div style="display: inline-block;float: right;">
          <span style="margin: 0 40px">日期:</span>
          <el-date-picker
            v-model="value6"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
          <el-button type="primary" @click="dataSearch">检索</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-form label-position="left" label-width="100px" class="demo-ruleForm">
      <el-form-item label=""  style="width:90%">
        <div style="float: right">
          <el-input v-model="keyWord" placeholder="请输入关键词" style="width: 224px"></el-input>
          <el-button type="primary" @click="keyWordSearch">检索</el-button>
        </div>
      </el-form-item>
      </el-form>
    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        label="订单号"
      >
        <template scope="scope">
          <span v-if="scope.row.order_sn">{{scope.row.order_sn}}</span>
          <span v-if="!scope.row.order_sn">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单商品简称"
      >
        <template scope="scope">
          <span v-if="scope.row.goods">{{scope.row.goods[0]}}</span>
          <span v-if="!scope.row.goods">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发货网点"
      >
        <template scope="scope">
          <span v-if="scope.row.post_network">{{scope.row.post_network}}</span>
          <span v-if="!scope.row.post_network">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收货城市"
      >
        <template scope="scope">
          <span v-if="scope.row.city">{{scope.row.city}}</span>
          <span v-if="!scope.row.city">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收货网点"
      >
        <template scope="scope">
          <span v-if="scope.row.sort">{{scope.row.sort}}</span>
          <span v-if="!scope.row.sort">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发货日期"
      >
        <template scope="scope">
          <span v-if="scope.row.post_time">{{scope.row.post_time}}</span>
          <span v-if="!scope.row.post_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发还日期"
      >
        <template scope="scope">
          <span v-if="scope.row.back_goods">{{scope.row.back_goods}}</span>
          <span v-if="!scope.row.back_goods">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收到日期"
      >
        <template scope="scope">
          <span v-if="scope.row.get_goods">{{scope.row.get_goods}}</span>
          <span v-if="!scope.row.get_goods">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收回日期"
      >
        <template scope="scope">
          <span v-if="scope.row.back_time">{{scope.row.back_time}}</span>
          <span v-if="!scope.row.back_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="租金合计"
      >
        <template scope="scope">
          <span v-if="scope.row.rent">{{scope.row.rent}}</span>
          <span v-if="!scope.row.rent">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="押金合计"
      >
        <template scope="scope">
          <span v-if="scope.row.deposit">{{scope.row.deposit}}</span>
          <span v-if="!scope.row.deposit">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="购买用户"
      >
        <template scope="scope">
          <span v-if="scope.row.user_name">{{scope.row.user_name}}</span>
          <span v-if="!scope.row.user_name">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单状态"
      >
        <template scope="scope">
          <span v-if="scope.row.type==2">待确认</span>
          <span v-if="scope.row.type==4">待发货</span>
          <span v-if="scope.row.type==5">已发货</span>
          <span v-if="scope.row.type==11">已评价完成</span>
          <span v-if="scope.row.type==0">关闭订单</span>
          <span v-if="scope.row.type==1">待支付租金</span>
          <span v-if="scope.row.type==3">待支付押金</span>
          <span v-if="scope.row.type==6">收货异常中</span>
          <span v-if="scope.row.type==7">确认收货使用中</span>
          <span v-if="scope.row.type==8">发还中待商家确认收货</span>
          <span v-if="scope.row.type==9">商家确认收货待退款</span>
          <span v-if="scope.row.type==10">已退款</span>
          <!--<span v-if="scope.row.type">{{scope.row.type}}</span>-->
          <span v-if="!scope.row.type">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="bianji(scope)">查看详情</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total" style="display: inline-block">
      </el-pagination><span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"orderList",
    data() {
      return {
        cityOptions:[ {
          value: '北京',
          label: '北京'
        }],
        value6:'',
        wangdian:'',
        checked:[],
        tableData: [],
        total:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        p:1,
        pageSize:15,
        keyWord:''
      }
    },
    created(){
      let obj = {
        p:this.p
      };
      this.getData(obj);
      let _this = this;
//

      _this.axios.get('http://shede.sinmore.vip/api/admin/website/index?page=1&pagesize=1000&token='+JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token)
        .then(function (response) {
          let data = response.data.data;
          _this.cityOptions = data.websites;

            if(response.data.error_code == 8) {
              alert(response.data.error_msg);
              return;
            }
        })
    },
    methods: {
      keyWordSearch(){
        let obj = {
          p:this.p,
          keyword:this.keyWord
        };
        this.getData(obj)
      },
      dataSearch(){
        let obj ={
          p:this.p
        };
        if (this.value6=='' || this.checked.length==0 || this.wangdian == ''){
          this.$message.error('请认真选择搜索条件');
          return;
        }else{
          obj.type = this.checked;
          obj.post_network = this.wangdian;
          obj.begin_time = this.getDate(this.value6[0]).replace('年','-').replace('月','-').replace('日','');
          obj.end_time = this.getDate(this.value6[1]).replace('年','-').replace('月','-').replace('日','');
        }
        console.log(obj)
        this.getData(obj)
      },
      bianji(s){
        window.open('/#/orderDetail/' + s.row.order_id + '')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.p = val;
        let obj = {
          p:this.p
        };
        this.getData(obj)
      },
      getData(data){
        let _this = this;
        _this.postFetch('/admin/order/list',data,function(data){
          _this.tableData = data.data.data;
          _this.total = data.data.total_p
        },function(){
        })
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
