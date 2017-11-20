<template>
  <div>
    <router-link to="/commodityDetail/add" target="_blank">
      <el-button type="primary">新建商品</el-button>
    </router-link>&nbsp;&nbsp;&nbsp;
    标签
    <el-select v-model="labal" placeholder="请选择">
      <el-option
        v-for="item in labals"
        :key="item.label_id"
        :label="item.name"
        :value="item.label_id">
      </el-option>
    </el-select>
    状态
    <el-select v-model="status" placeholder="请选择">
      <el-option
        v-for="item in statuss"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-input v-model="name" placeholder="关键词" style="width: 250px;"></el-input>
    <el-button type="text" size="small" @click="search">搜索</el-button>
    <el-table
      :data="tableData"
      style="width:100%;margin-top:28px">
      <el-table-column
        prop="id"
        label="商品id"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        label="押金"
        prop="deposit"
      >
      </el-table-column>
      <el-table-column
        label="起租价格"
        prop="start_price"
      >
      </el-table-column>
      <el-table-column
        label="起租天数"
        prop="start_days"
      >
      </el-table-column>
      <el-table-column
        label="续租价格"
        prop="keep_price"
      >
      </el-table-column>
      <el-table-column
        label="商品状态"
      >
        <template scope="scope">
          <span v-if="scope.row.status ==1">上架</span>
          <span v-if="scope.row.status ==0">下架</span>
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        prop="sort"
      >
      </el-table-column>
      <el-table-column
        label="剩余库存"
        prop="surplus_sum"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
      >
        <template scope="scope">
          {{scope.row.created_at | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope)">删除</el-button>
          <el-button type="text" size="small" @click="bianji(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="showqq(scope)">显示商品库存</el-button>
          <el-button type="text" size="small" @click="oper(scope,0)" v-if="scope.row.status ==1">下架</el-button>
          <el-button type="text" size="small" @click="oper(scope,1)" v-if="scope.row.status ==0">上架</el-button>
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
      </el-pagination>
      <span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';

  export default {
    name: "bannerList",
    filters: {
      formatDate(time) {
        if (time == 0) {
          return '-';
        }
        var date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        tableData: [],
        total: 0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        p: 1,
        pageSize: 50,
        labal: '',
        labals: [],
        status: '',
        statuss: [
          {id: 1, name: "上架"},
          {id: 0, name: "下架"}
        ],
        name: ''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      bianji(s) {
        window.open('/#/addBanner/' + s.row.id + '')
      },
      del(s) {
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(s.row.id)
          this.postFetch('/api/admin/goods/destory', {goods_id: s.row.id},
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
      getData() {
        let _this = this;
        this.axios.get('http://shede.sinmore.vip/api/admin/labels/index?page=1&pagesize=1000&token=000')
          .then(function (labaldata) {
            _this.labals = labaldata.data.data.list;
          })
          .catch(function () {
          });

        let isType = '';
        if (this.$route.params.type == 'labal') {
          isType = '&goods_label=' + this.$route.params.id;
        } else if (this.$route.params.type == 'status') {
          isType = '&status=' + this.$route.params.id;
        } else if (this.$route.params.type == 'name') {
          isType = '&name=' + this.$route.params.id;
        }
        let url = 'http://shede.sinmore.vip/api/admin/goods/index?page=' + _this.p + '&pagesize=' + _this.pageSize + '&token=000' + isType
        _this.axios.get(url)
          .then(function (response) {
            console.log(response);
            _this.tableData = response.data.data.list;
            _this.total = response.data.data.count
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      search() {
        window.open('/#/commodityList/name/' + this.name + '')
      },
      oper(s, n) {
        this.postFetch('/api/admin/goods/setStatus', {
            goods_id: s.row.id,
            status: n
          },
          function (data) {
            if (data.error_code === 0) {
              s.row.status = (n==1)?0:1;
            }
          },
          function (e) {
            console.log(e)
          }
        )
      },
      showqq(S){
        window.open('/#/showkc/' + this.labal + '')
      }
    },
    watch: {
      labal() {
        console.log(this.labal);
        window.open('/#/commodityList/labal/' + this.labal + '')
      },
      status() {
        console.log(this.labal)
        window.open('/#/commodityList/status/' + this.status + '')
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
