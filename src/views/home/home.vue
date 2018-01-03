<template>
  <el-row class="home">
    <el-row class="home__container">
      <el-col span="12" class="home__link"><a href="http://www.szchengnan.com/" target="_blank">嵊州市城南小学欢迎你</a></el-col>
      <el-col span="12" class="home__test">
        <router-link :to="{ path: '/login' }">管理员登录</router-link>&nbsp;&nbsp;
        <a href="javascript:void(0);" @click="dialogVisible = true">{{ type }}在线测试 <i class="fa fa-arrow-circle-o-right"></i></a>
      </el-col>
      <el-col span="24">
        <img class="home__logo" src="../../assets/logo.jpg" alt="校园全景">
      </el-col>
    </el-row>

    <el-dialog
      title="选择题量"
      :visible.sync="dialogVisible"
      width="30%">
      <span>总题数：<strong>{{ number }}</strong></span>
      <el-row class="test__num">
        <span>选择题：</span>
        <el-input-number 
          v-model="num1" 
          @change="handleChange" 
          :min="0" 
          :max="number"
          size="small" 
          label="选择题"></el-input-number>
      </el-row>

      <el-row class="test__num">
        <span>判断题：</span>
        <el-input-number 
          v-model="num1" 
          @change="handleChange" 
          :min="0" 
          :max="number"
          size="small" 
          label="判断题"></el-input-number>
      </el-row>

      <el-row class="test__num">
        <span>欣赏题：</span>
        <el-input-number 
          v-model="num1" 
          @change="handleChange" 
          :min="0" 
          :max="number"
          size="small" 
          label="欣赏题"></el-input-number>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import router from '../../router/router'

  export default {
    data () {
      return {
        type: '越韵古诗',
        dialogVisible: false,
        number: 50,
        num1: 0
      }
    },
    methods: {
      confirm () {
        this.dialogVisible = false,
        router.push({ path: 'test' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/body_bg.jpg') no-repeat 0 0;
    background-attachment: fixed;
    .home__container {
      width: 1024px;
      margin: 0 auto;
    }
    .home__link {
      padding: 20px 10px;
      height: 200px;
      line-height: 200px;
      a {
        font-size: 28px;
        color: #000;
        text-decoration: none;
      }
    }
    .home__test {
      position: relative;
      height: 200px;
      text-align: right;
      a {
        position: relative;
        top: 190px;
        font-size: 18px;
        color: #000;
        text-decoration: none;
        &:hover {
          color: red;
        }
      }
    }
    .home__logo {
      margin-top: 40px;
      width: 100%;
      box-shadow: 7px 7px 10px #888888;
    }
    .test__num {
      margin-top: 15px;
    }
  }
</style>
