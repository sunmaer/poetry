<template>
  <el-container direction="vertical">
    <head-top></head-top>
    <el-container class="main">
      <side-bar></side-bar>
      <el-main>主体内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HeadTop from '../../components/header/header'
  import SideBar from '../../components/sideBar/sideBar'

  export default {
    name: 'Index',
    components: {
      HeadTop,
      SideBar
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
  }
</style>
