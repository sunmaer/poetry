<template lang="html">
  <el-row class="main">
    <el-card class="login__box">
      <div slot="header" class="login__header">
        <span> <i class="fa fa-sign-in"></i> 欢迎登录</span>
      </div>
      <el-form :model="formLabelAlign">
        <el-form-item>
          <el-input v-model="formLabelAlign.name" prefix-icon="fa fa-user fa-lg" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="formLabelAlign.region" prefix-icon="fa fa-lock fa-lg" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group>
            <el-checkbox label="记住密码" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login__button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script type="text/javascript">
  export default {
    // 不要忘记了 name 属性
    name: 'RangeSlider',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      bar: {}, // 按字母顺序
      foo: {},
      fooBar: {}
    },
    // 变量
    data () {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
  }
</script>

<style scoped lang="scss">
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login_bg.jpg');
    background-size: cover;
    background-position: 50%;
  }
  .login__box {
    position: absolute;
    top: 50%;
    transform: translateY(-58%);
    -webkit-transform: translateY(-58%);
    right: 100px;
    width: 350px;
  }
  .login__header {
    font-weight: bold;
    text-align: left;
  }
  .login__button {
    width: 100%;
  }
</style>