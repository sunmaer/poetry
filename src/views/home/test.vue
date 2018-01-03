<template>
  <el-row class="test">
    <el-row class="container">
      <h1>越韵古诗测试试卷
        <a href="">登录/注册</a>
      </h1>

      <el-row class="test__question">
        <section>
          <h3>一、选择题（共5题，每题5分。每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row class="question__item">
            <h4>1. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>2. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>3. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <section>
          <h3>二、判断题（共5题，每题5分。请根据题目内容选择正确或者错误）</h3>
          <el-row class="question__item">
            <h4>1. “白日依山尽，黄河入海流”的作者是孙梦海，请问正确吗？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="T">正确</el-radio>
              <el-radio label="F">错误</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>2. “白日依山尽，黄河入海流”的作者是孙梦海，请问正确吗？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="T">正确</el-radio>
              <el-radio label="F">错误</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>3. “白日依山尽，黄河入海流”的作者是孙梦海，请问正确吗？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="T">正确</el-radio>
              <el-radio label="F">错误</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <section>
          <h3>三、欣赏题（共5题，每题5分。请欣赏完作品后完成选项，每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row class="question__item">
            <h4>1. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>2. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>

          <el-row class="question__item">
            <h4>3. 请问“白日依山尽，黄河入海流”的作者是谁？</h4>
            <el-radio-group v-model="radio2" class="item">
              <el-radio label="A">李白</el-radio>
              <el-radio label="B">杜甫</el-radio>
              <el-radio label="C">孟浩然</el-radio>
              <el-radio label="D">王之涣</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <el-row  class="test__handle">
          <el-button type="primary">提交试卷</el-button>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      radio2: 'hello'
    }
  }
}
</script>

<style lang="scss" scoped>
  .test {
    position: fixed;
    overflow: auto;
    width: 100%;
    height: 100%;
    background: url('../../assets/body_bg.jpg') no-repeat 0 0;
    background-attachment: fixed;
    .container {
      margin: 0 auto;
      width: 1024px;
      h1 {
        position: relative;
        margin: 10px 0;
        padding: 30px 0;
        text-align: center;
        a {
          position: absolute;
          right: 10px;
          bottom: 0;
          color: #657180;
          font-size: 15px;
          text-decoration: none;
          &:hover {
            color: red;
          }
        }
      }
      .test__question {
        width: 100%;
        border: 1px solid #712704;
        border-radius: 5px;
        margin-bottom: 50px;
        padding: 30px;
        box-sizing: border-box;
        background-color: white;
        .question__item {
          padding: 0 20px;
          h4 {
            margin: 10px 0;
          }
          .item {
            margin: 10px 20px;
          }
        }
        .test__handle {
          margin: 40px 0 20px;
          text-align: center;
        }
      }
    }
  }
</style>
