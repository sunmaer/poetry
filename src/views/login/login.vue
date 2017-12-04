<template lang="html">
  <el-row class="main">
    <el-card class="login__box">
      <div slot="header" class="login__header">
        <span> <i class="fa fa-sign-in"></i> 欢迎登录</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
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
    data () {},
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
    transform: translateY(-60%);
    right: 130px;
    width: 350px;
  }
  .login__header {
    font-weight: bold;
    text-align: left;
  }
</style>