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
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%; border: 1px solid rgb(230, 235, 245); border-bottom: none;"
      header-row-style="color: #000000; background-color: #eef1f6;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="type"
        label="题目类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="content"
        label="题目内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="answer"
        label="题目答案"
        width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      class="question__page">
    </el-pagination>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData3: [{
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }, {
          type: '选择题',
          content: '像我这样优秀的人，本该灿烂过一生，怎么二十多年到头来，还在人海里浮沉',
          answer: 'A'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .question__form {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #eef1f6;
    .form__item {
      margin-bottom: 0px;
    }
  }
  .question__page {
    margin: 15px 0 0 0;
    text-align: right;
  }
</style>