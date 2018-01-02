<template>
  <el-row class="home">
    <el-row class="home__container">
      <el-col span="12" class="home__link"><a href="http://www.szchengnan.com/" target="_blank">嵊州市城南小学欢迎你</a></el-col>
      <el-col span="12" class="home__test"><a href="">{{ type }}在线测试 <i class="fa fa-arrow-circle-o-right"></i></a></el-col>
      <el-col span="24">
        <img class="home__logo" src="../../assets/logo.jpg" alt="校园全景">
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        type: '越韵古诗'
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
      height: 160px;
      line-height: 160px;
      a {
        font-size: 28px;
        color: #000;
        text-decoration: none;
      }
    }
    .home__test {
      position: relative;
      height: 160px;
      a {
        position: absolute;
        right: 10px;
        bottom: 0px;
        font-size: 18px;
        color: #000;
        text-decoration: none;
        &:hover {
          color: red;
        }
      }
    }
    .home__logo {
      margin-top: 20px;
      width: 100%;
      box-shadow: 7px 7px 10px #888888;
    }
  }
</style>
