<template>
  <el-row>
    <el-form :inline="true" :model="formInline" size="small" class="administor__form">
      <el-form-item class="form__item">
        <el-input v-model="formInline.admin" placeholder="管理员用户名"></el-input>
      </el-form-item>
      <el-form-item class="form__item">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"

      :data="adminData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%; border: 1px solid rgb(230, 235, 245); border-bottom: none;"
      header-row-style="color: #000000; background-color: #eef1f6;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
    </el-table>

    <el-row class="administor__footer">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next"
        :total="adminData.length"
        class="administor__page">
      </el-pagination>
    </el-row>

    <!-- 新增界面 -->
    <el-dialog
      title="添加管理员"
      :visible.sync="addDialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="70px" label-position="right">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addAdministor(form)">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        headertitle:'管理员',
        addDialogVisible: false,
        currentPage:1,
        pagesize:10,
        formInline: {
          admin:''
        },
        form: {
          name:'',
          password:''
        },
        adminData: [],
        oldadminData:[]
      }
    },
    created(){
      let self = this;
      axios.get(API_HOST+"AdminList")
      .then((res) => {
        if(res.data.status == true){
          this.adminData = res.data.data;
        }
      });
    },
    methods: {
      search:function(){
        console.log(this.formInline.admin);
        if(this.formInline.admin == ''){
          this.adminData = this.oldadminData;
        }else{
          this.adminData = this.oldadminData.filter(item => (~item.name.indexOf(this.formInline.admin)));
        }
      },
      addAdministor(formName){
        if(this.form.name == ''){
          return;
        }
        if(this.form.password == ''){
          return;
        }
        axios.post(API_HOST+'Admin/Add',{
            name:this.form.name,
            password:this.form.password
          })
          .then((res) => {
            if(!res.data.status) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
            }
          }).catch((err) => {
            this.$message.error(`添加失败 ${err}`)
          })
      },
      handleEdit(index, row){
        console.log(row);
        this.editAdmin = true;
        this.editform.id = row.id;
        this.editform.name = row.name;
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
      }

    },
    mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  .administor__form {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #eef1f6;
    .form__item {
      margin-bottom: 0px;
    }
  }
  .administor__footer {
    padding: 10px;
    margin-top: 10px;
    background-color: #eef1f6;
  }
  .administor__page {
    float: right;
  }
</style>