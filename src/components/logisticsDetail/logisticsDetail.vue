<template>
  <div>
    <el-form label-position="left" label-width="100px"
             class="demo-ruleForm">
      <el-form-item
        label="所属网点"
        style="width:30%"
      >
        {{wdInfo.name}}
      </el-form-item>
      <el-form-item
        label="地址"
        style="width:30%"
      >
        {{wdInfo.address}}
      </el-form-item>
      <el-form-item
        label="选择省份"
        style="width:80%"
      >
        <el-cascader
          :options="city"
          v-model="clickDq"
          :props="proo"
          style="display: inline-block;width:30%"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item
        label="物流时间信息"
        style="width:80%"
      >
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="ID">
            <template scope="scope">
              <span v-if="scope.row.id">
                {{scope.row.id}}
              </span>
              <span v-if="!scope.row.id">新增城市暂无id</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="所属省份">
          </el-table-column>
          <el-table-column
            prop="city"
            label="对应城市">
          </el-table-column>
          <el-table-column
            label="物流时间">
            <template scope="scope">
              <el-input v-model="scope.row.to_days"
                        placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'logisticsDetail',
    data(){
      return {
        tableData: [],
//          /api/admin/logistics/update
        city: [],
        wdInfo: {},
        clickDq: [],
        proo: {
          value: "id",
          label: "name",
          children: "get_city"
        }
      }
    },
    created(){
      let _this = this;
      this.axios.get('http://shede.sinmore.vip/api/citylist')
        .then(function (response) {
          let data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            delete data[i].get_city
          }
          _this.city = data;
        })
        .catch(function (response) {
          console.log(response);
        });
      this.axios.get('http://shede.sinmore.vip/api/admin/logistics/index?website_id=' + this.$route.params.id + '&token=000')
        .then(function (response) {
          console.log(response)
          _this.wdInfo = response.data.data.website;
          _this.tableData = response.data.data.logistics;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    methods: {
      getData(){
/*        let _this = this;
        let url = '/api/admin/logistics/update';
        let obj = {};
        this.postFetch(url, obj,
          function (data) {
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            } else {
              _this.$router.push({path: '/branchList/add'});
            }
          },
          function (e) {
            console.log(e)
          }
        )*/
      },
      save(){
        let _this = this;
        console.log(_this.tableData)
        let ars = [];
        for (let i = 0; i < _this.tableData.length; i++) {
          let obj = {
            province_id:parseInt(_this.tableData[i].province_id),
            city_id: parseInt(_this.tableData[i].city_id),
            to_days: parseInt(_this.tableData[i].to_days)
          };
          ars.push(obj);
        }
        this.postFetch('/api/admin/logistics/update', {
            website_id: parseInt(_this.$route.params.id),
            list: ars
          },
          function (data) {
            console.log(data)
            /*           if (data.error_code === 1) {
             _this.$message({
             type: 'warning',
             message: '' + data.error_msg + ''
             });
             }else {
             _this.$router.push({path: '/branchList/add'});
             }*/
          },
          function (e) {
            console.log(e)
          }
        )
      }
    },
    watch: {
      clickDq(n){
//          /api/admin/logistics/index
        let _this = this;
        this.axios.get('http://shede.sinmore.vip/api/admin/logistics/index?website_id=' + this.$route.params.id + '&token=000&province_id=' + n[0] + '')
          .then(function (response) {
            _this.tableData = response.data.data.logistics;
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }
  }
</script>
<style>
</style>
