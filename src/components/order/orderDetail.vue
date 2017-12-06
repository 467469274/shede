<template>
  <div class="orderDetail">
    <el-form label-width="100px">
      <el-form-item label="">
        <p class="orderTitle">订单状态：{{type}} <span>订单编号:{{ddbj}}&nbsp;&nbsp;下单时间:{{xdsj}} &nbsp; &nbsp; &nbsp;购买用户名称:{{userName}}</span>
        </p>
        <p><a>订单基本信息</a> >>>>>    <a :href="url">订单基本信息</a></p>
      </el-form-item>
      <el-form-item label="备注:" v-if="yType!= 0 && yType!=11&& (get_remark!='undefined' || get_remark.length != 0) ">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="beizhu"
          style="width: 450px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="押金退款:" v-if="yType==11">{{yjtk}}
      </el-form-item>
      <el-form-item label="押金退款:" v-if="yType==9">

        <el-input
          placeholder="请输入内容"
          v-model="yjtk"
          style="width: 450px"
        ></el-input>

      </el-form-item>
      <el-form-item label="租金退款:" v-if="yType==9">

        <el-input
          placeholder="请输入内容"
          v-model="zjtk"
          style="width: 450px"
        ></el-input>

      </el-form-item>
      <el-form-item label="租金退款:" v-if="yType==11">{{zjtk}}
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==2">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">确认订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==3">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为待发货订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==4">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure('key')">变更为已发货订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==5">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为使用中订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==7">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为发还中订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==8">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为待退款订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==9">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为待评价订单</el-button>
      </el-form-item>
      <el-form-item label="修改状态:" v-if="yType==10">
        <el-button type="primary" style="margin-right: 20px" @click="closeDD">关闭订单</el-button>
        <el-button type="primary" style="margin-left: 20px" @click="sure">变更为已评价订单</el-button>
      </el-form-item>
      <el-form-item
        label="图片"
        style="width:30%"
        v-if="yType==4"
      >

        <el-upload
          class="avatar-uploader"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'goods'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>


        请上传JPG;PNG格式文件

        文件大小不超过1MB

      </el-form-item>
      <el-form-item label="" v-for="(item ,index) in no_remark" :key="index">
        <p v-if="item.get_name">{{item.create_time}}&nbsp;&nbsp;&nbsp;{{item.get_name.name}}&nbsp;&nbsp;&nbsp;{{item.remark}}</p>
      </el-form-item>
      <el-form-item label="费用明细:">
        <p v-if="ist"> 租金：应付【￥
          <el-button type="text" @click="textPop('zujinyingfu')">{{zujinyingfu}}</el-button>
                       】 / 实收￥{{zujinshishou}}
        </p>
        <p v-if="!ist"> 租金：应付【￥{{zujinyingfu}}】 / 实收￥{{zujinshishou}}</p>

        <p v-if="ist"> 押金：应付【￥
          <el-button type="text" @click="textPop('yajinyingfu')">{{yajinyingfu}}</el-button>
                       】 / 实收￥{{yajinshishou}}
        </p>
        <p v-if="!ist"> 押金：应付【￥{{yajinyingfu}}】 / 实收￥{{yajinshishou}}</p>

        <p v-if="yType == 2"> 退款￥{{tuikuan}}</p>
        <p> 延期费用：￥{{yanqi}}</p>

        <p> 优惠券抵扣：-￥{{dikou}}</p>
      </el-form-item>
      <el-form-item label="商品发货:" class="formP" v-if="yType==2 || yType==3 || yType==4">
        <p><span>发货日期:&nbsp;&nbsp;&nbsp;{{fhrq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>收到日期:{{sdrq}}</span></p>
        <p><span>目标地址:&nbsp;&nbsp;&nbsp;{{shr}}&nbsp;&nbsp;{{mobile}}&nbsp;&nbsp;{{mbdz}}</span></p>
        <p>发送网点:&nbsp;&nbsp;&nbsp;
          <el-select v-model="choseWd" placeholder="请选择">
            <el-option
              v-for="item in wdops"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <p>
          物流单号:&nbsp;&nbsp;&nbsp;
          <el-input v-model="wldh" placeholder="请输入内容" style="width: 235px"></el-input>
        </p>
        <p>
          客服人员:&nbsp;&nbsp;&nbsp;
          <el-input v-model="kfry" placeholder="请输入内容" style="width: 235px"></el-input>
        </p>
      </el-form-item>
      <el-form-item label="商品发货:" class="formP"
                    v-if="yType==5 || yType==7 || yType==8|| yType==9 || yType==10 || yType==11 || yType==0">
        <p><span>发货日期:&nbsp;&nbsp;&nbsp;{{fhrq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>收到日期:{{sdrq}}</span></p>
        <p><span>目标地址:&nbsp;&nbsp;&nbsp;{{shr}}&nbsp;&nbsp;&nbsp;{{mobile}}{{mbdz}}</span></p>
        <p>发送网点:&nbsp;&nbsp;&nbsp;

          <el-select v-model="choseWd" disabled placeholder="请选择">
            <el-option
              v-for="item in wdops"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <p>
          物流单号:&nbsp;&nbsp;&nbsp;:{{wldh}}
        </p>
        <p>
          客服人员:&nbsp;&nbsp;&nbsp;{{kfry}}
        </p>
      </el-form-item>
      <el-form-item label="用户返还:" class="formP" v-if="yType==2 || yType==3 || yType==4 || yType==5 || yType==7">
        <p><span>返还日期:&nbsp;&nbsp;&nbsp;{{farq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>收回日期:{{shrq}}</span></p>
        <p>选择网点:&nbsp;&nbsp;&nbsp;
          <el-select v-model="choseWd2" placeholder="请选择">
            <el-option
              v-for="item in wdops"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <p>
          物流单号:&nbsp;&nbsp;&nbsp;
          <el-input v-model="wldh2" placeholder="请输入内容" style="width: 235px"></el-input>
        </p>
      </el-form-item>
      <el-form-item label="用户返还:" class="formP" v-if="yType==8 || yType==9 || yType==10 || yType==11 || yType==0">
        <p><span>返还日期:&nbsp;&nbsp;&nbsp;{{farq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>收回日期:{{shrq}}</span></p>
        <p>发还网点:&nbsp;&nbsp;&nbsp; :
          <el-select v-model="choseWd2" disabled placeholder="请选择">
            <el-option
              v-for="item in wdops"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <p>
          物流单号:&nbsp;&nbsp;&nbsp;{{wldh2}}
        </p>
      </el-form-item>
      <el-form-item label="商品全家福" v-if="yType!=2 && yType!=3 && yType!=4 && yType!=5">
        <img src="/static/d79188de9c82d1588b5274f9890a19d8bd3e4239.jpg" style="max-width: 400px" v-if="imageUrl!=''">
        <span v-if="imageUrl==''">暂无</span>
      </el-form-item>
      <el-form-item
        label="商品全家福"
        style="width:30%"
        v-if="yType==5"
      >
        <el-upload
          class="avatar-uploader"
          action="http://shede.sinmore.vip/api/storeImage"
          name="image"
          :data="{model:'goods'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'orderDetail',
    data() {
      return {
        beizhu: '',  // 备注
        wdops: [],
        ddbj: '123456789',
        userName: '用户名称',
        xdsj: '2017年10月27日22:20:59',
        operUser: '何沙乐', //操作管理员
        operTime: '2017年10月25日23:34:49',  // 操作时间
        zujinshishou: 999,  // 租金实收
        zujinyingfu: 999,  //租金应付
        yajinshishou: 999, // 押金实收
        yajinyingfu: 999,  //押金应付
        tuikuan: 999,  //退款
        yanqi: 999,  //延期费用
        dikou: 999, // 优惠券抵扣
        fhrq: '2017年10月27日21:41:21',  // 发货日期
        sdrq: '2017年10月27日21:41:36',  // 收到日期
        mbdz: '时振川，17600220747，四川省，广元市，新城区麒麟大厦2301',  // 目标地址
        shr: 'szc',
        choseWd: '',//网点选择
        wldh: '',  // 物流单号
        wldh2: '',  // 返回物流单号
        kfry: '',  // 客服人员
        farq: '2017年10月27日21:51:35', //发还日期
        shrq: '2017年10月27日21:51:53', //收回日期
        choseWd2: '', // 发还网点
        yjtk: 0, // 押金退款
        zjtk: 0, // 租金退款
        yType: '',//服务器返回的订单状态
        member_id: '',//用户id
        mobile: '29884949498',//用户id
        get_remark: [],
        imageUrl: '',
        no_remark: []
      }
    },
    created() {
      let _this = this;
      let user = _this.getCookie('userCookie');
      let token = JSON.parse(JSON.parse(user)).token;
      this.axios.get('http://shede.sinmore.vip/api/admin/website/index?token=' + token + '&page=1&pagesize=10000')
        .then(function (response) {
          if (response.data.error_code == 8) {
            alert(response.data.error_msg)
          }
          let data = response.data.data.websites;
          _this.wdops = data;
          _this.getData({
            order_id: _this.$route.params.id
          })
        })
        .catch(function (response) {
        });
    },
    methods: {
      getData(obj) {
        let _this = this;
        _this.postFetch('/admin/order/detail', obj, function (data) {
          console.log(data.data)
          _this.yType = data.data.type;
          _this.ddbj = data.data.order_sn;
          _this.mbdz = data.data.address;
          _this.yjtk = data.data.back_deposit;
          _this.xdsj = data.data.create_time;
          if (data.data.get_user) {
            _this.userName = data.data.get_user.name;
          }
          _this.choseWd2 = data.data.back_network;
          _this.wldh2 = data.data.back_odd_number;
          _this.zjtk = data.data.back_rent;
          _this.shrq = data.data.back_time;
          _this.shr = data.data.consignee;
          _this.dikou = data.data.coupon;
          _this.xdsj = data.data.create_time;
          _this.yanqi = data.data.delay_total;
          _this.yajinshishou = data.data.deposit;
          _this.yajinyingfu = data.data.deposit_true;
          _this.sdrq = data.data.get_goods;
          _this.member_id = data.data.member_id;
          _this.mobile = data.data.mobile;
          _this.choseWd = data.data.post_network;
          _this.wldh = data.data.post_odd_number;
          _this.post_time = data.data.fhrq;
          _this.zujinshishou = data.data.rent;
          _this.zujinyingfu = data.data.rent_true;
          _this.operUser = data.data.waiter;
          _this.get_remark = data.data.get_remark;
          _this.no_remark = data.data.no_remark;
          _this.kfry = data.data.waiter;
          _this.imageUrl = data.data.all_pic;
        })
      },
      textPop(n) {
        this.$prompt('请输入应收金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          if (n == 'zujinyingfu') {
            this.zujinyingfu = value
          } else {
            this.yajinyingfu = value
          }
        }).catch(() => {
        });
      },
      onSubmit() {
        console.log(1)
        let _this = this;
        let obj = {
          order_id: _this.$route.params.id,
        };
        if (_this.yType == 4) {
          obj.all_pic = _this.imageUrl
        }
        if (_this.yType <= 3 && _this.yType != 0) {
          obj.deposit = _this.zujinyingfu;
          obj.rent = _this.yajinyingfu
        }
        if (_this.yType < 4) {
          obj.post_network = _this.choseWd
          obj.post_odd_number = _this.wldh
          obj.waiter = _this.kfry
          obj.address = _this.mbdz
          obj.consignee = _this.shr
        }
        if (_this.yType >= 5 && _this.yType <= 7) {
          obj.back_network = _this.choseWd2
        }
        if (_this.yType == 9) {
          obj.back_deposit = _this.zujinyingfu - _this.zujinshishou - _this.dikou
          obj.bakc_rent = _this.yajinyingfu - _this.yajinshishou - _this.dikou
        }

        console.log(obj)
        _this.postFetch('/admin/order/update', obj, function (data) {
          console.log(data);
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
//            location.reload()
//
            _this.$router.push({path: '/orderList'});

          }
        }, function () {
        })
      },
      handleAvatarSuccess(re) {
        this.imageUrl = re.data.filename
      },
      closeDD() {
        let _this = this;
        let obj = {
          order_id: _this.$route.params.id,
          type: 1
        };
        if(_this.beizhu!=''){
          obj.remark = _this.beizhu;
        }
        this.$confirm('请您确认本次操作无误。')
          .then(_ => {
            let _this = this;
            _this.postFetch('/admin/order/change',obj, function (datas) {
              if (datas.error_code == 0) {
                location.reload()
              } else {
                _this.$message.error('' + datas.error_msg + '');
              }
            })
          })
          .catch(_ => {

          });

      },
      sure(data) {
        let _this = this;
        let obj = {
          order_id: _this.$route.params.id,
          type: 0
        };
        if(_this.beizhu!=''){
          obj.remark = _this.beizhu;
        }
        if (data == 'key' && this.imageUrl == '') {
          _this.$confirm('您还未录入“商品全家福”，您确认吗？')
            .then(() => {
              this.$confirm('请您确认本次操作无误。')
                .then(_ => {
                  _this.postFetch('/admin/order/change',obj, function (datas) {
                    if (datas.error_code == 0) {
                      location.reload()
                    } else {
                      _this.$message.error('' + datas.error_msg + '');
                    }
                  })
                })
                .catch(_ => {

                });
            })
            .catch(() => {
            });
        } else {
          this.$confirm('请您确认本次操作无误。')
            .then(_ => {
              let _this = this;
              _this.postFetch('/admin/order/change',obj, function (datas) {
                if (datas.error_code == 0) {
                  location.reload()
                } else {
                  _this.$message.error('' + datas.error_msg + '');
                }
              })
            })
            .catch(_ => {

            });
        }
//        /admin/order/change

      }
    },
    computed: {
      showImg() {
        return 'http://shede.sinmore.vip/storage/goods/' + this.imageUrl;
      },
      ist() {
        if (this.yType == 2) {
          return true;
        } else {
          return false;
        }
      },
      type() {
        switch (this.yType) {
          case 0:
            return '关闭订单';
          case 1:
            return '待支付租金';
          case 2:
            return '待确认';
          case 3:
            return '待支付押金';
          case 4:
            return '已支付押金待发货';
          case 5:
            return '已发货待收货';
          case 6:
            return '收货异常中';
          case 7:
            return '确认收货使用中';
          case 8:
            return '发还中待商家确认收货';
          case 9:
            return '商家确认收货待退款';
          case 10:
            return '已退';
          case 11:
            return '已评价';
        }
      },
      url() {
        return '/#/orderInnerList/' + this.$route.params.id
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";

  .orderTitle span {
    font-size: 16px;
    font-weight: normal;
  }

  .orderTitle {
    font-size: 20px;
    font-weight: 600;
  }

  .formP p {
    margin-bottom: 15px;
  }
</style>
