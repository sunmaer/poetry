<template>
  <el-row>
    <el-form :inline="true" :model="formInline" class="question__form">
      <el-form-item class="form__item">
        <el-input v-model="formInline.user" placeholder="题目名称"></el-input>
      </el-form-item>
      <el-form-item class="form__item">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .question__form {
    padding: 10px;
    background-color: #eef1f6;
    .form__item {
      margin-bottom: 0px;
    }
  }
</style>