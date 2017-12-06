<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <admin-info></admin-info>
    </el-col>
    <el-col :span="7">
      <count-info bgColor="#67C23A" icon="user-plus" number="412" type="学生总数"></count-info>
    </el-col>
    <el-col :span="7">
      <count-info bgColor="#EB9E05" icon="edit" number="250" type="题目总数" ></count-info>
    </el-col>
  </el-row>
</template>

<script>
  import AdminInfo from '../../views/index/adminInfo'
  import CountInfo from '../../views/index/countInfo'

  export default {
    components: {
      AdminInfo,
      CountInfo
    }
  }
</script>

<style lang="scss" scoped>

</style>
