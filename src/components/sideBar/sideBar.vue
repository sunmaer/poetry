<template>
  <el-aside width="230px">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#f5f5f5"
      text-color="#48576a"
      active-text-color="#20a0ff">
      <el-menu-item index="1">
        <i class="fa fa-tachometer fa-lg"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-folder-o fa-lg"></i>
          <span slot="title">题库管理</span>
        </template>
        <el-menu-item index="2-1">题库列表</el-menu-item>
        <el-menu-item index="2-2">增加题目</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-user-o fa-lg"></i>
          <span slot="title">学生管理</span>
        </template>
        <el-menu-item index="3-1">学生列表</el-menu-item>
        <el-menu-item index="3-2">增加学生</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-id-card-o fa-lg"></i>
          <span slot="title">管理员</span>
        </template>
        <el-menu-item index="4-1">管理员列表</el-menu-item>
        <el-menu-item index="4-2">增加管理员</el-menu-item>
        <el-menu-item index="4-2">个人中心</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data () {
      return {
        isCollapse: true
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
  }
  .fa {
    margin-right: 10px;
  }
</style>