<template>
  <div>
    <p>
      相关教程
    </p>

    <el-table
      :data="courseList"
      style="width:100%;margin-top:28px">
      <el-table-column
        prop="id"
        label="教程id"
      >
      </el-table-column>
      <el-table-column
        label="教程名称"
        prop="study_name"
      >
      </el-table-column>
      <el-table-column
        label="url"
        prop="study_url"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
      >
        <template scope="scope">
          {{scope.row.updated_at | formatDate}}
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="sort"-->
        <!--label="排序"-->
      <!--&gt;-->
      <!--</el-table-column>-->
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

    编辑:
    <el-input v-model="name" placeholder="请输入内容" style="width:150px;display:inline-block;"></el-input>
    <el-input v-model="url" placeholder="请输入内容" style="width:150px;display:inline-block;"></el-input>
    <el-button type="primary" @click="save(0)">保存</el-button>
    <br>
    添加:
    <el-input v-model="newname" placeholder="请输入内容" style="width:150px;display:inline-block;"></el-input>
    <el-input v-model="newurl" placeholder="请输入内容" style="width:150px;display:inline-block;"></el-input>
    <el-button type="primary" @click="save(1)">保存</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';

  export default {
    name: 'course',
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
        courseList: [],
        name: '',
        url: '',
        newname: '',
        newurl: '',
        cid:0
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let _this = this;
        let token = JSON.parse(JSON.parse(_this.getCookie('userCookie'))).token;
        this.axios.get('http://shede.sinmore.vip/api/admin/studys/index?page=1&pagesize=1000&token='+token+'&goods_id=' + _this.$route.params.id)
          .then(function (course) {

            if(course.data.error_code == 8){
              alert(course.data.error_msg);
              return;
            }
            let data = course.data.data;
            _this.courseList = data.list;
            console.log(data)
          })
          .catch(function () {
          });
      },
      del(s) {
        let _this = this;
        this.$confirm('此操作将永久删除该教程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(s.row.id)
          this.postFetch('/api/admin/studys/destory', {study_id: s.row.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.courseList.splice(s.$index, 1);
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
      bianji(s) {
        let _this = this;
        _this.name = s.row.study_name;
        _this.url = s.row.study_url;
        _this.cid = s.row.id;
      },
      save(n) {
        let obj = {};
        let _this = this;
        let url = '';
        if (n == 0) {
          obj.study_id = _this.cid;
          obj.study_name = _this.name;
          obj.study_url = _this.url;
          url = '/api/admin/studys/update'
        } else {
          obj.goods_id = _this.$route.params.id;
          obj.study_name = _this.newname;
          obj.study_url = _this.newurl;
          url = '/api/admin/studys/store'
        }

        this.postFetch(url,obj,
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
                message: '成功'
              });
              _this.getData();
              _this.name = '';
              _this.url = '';
              _this.newurl = '';
              _this.newname = '';
            }
          },
          function (e) {
            console.log(e)
          }
        )
      }
    }
  }
</script>
<style>
</style>
