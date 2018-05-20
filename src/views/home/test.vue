<template>
  <el-row class="test">
    <el-row class="container">
      <h1>越韵古诗测试试卷</h1>
      <div class="test_info">
        <a class="test_login" v-if="!isLogin" href="javascript:void(0);" @click="LoginVisible = true">学生登录/注册</a>
        <template v-else>
          <span class="test_student">学号：{{this.id}}</span>
          <span class="test_student">姓名：{{this.name}}</span>
          <span class="test_student">班级：{{this.class}}</span>
        </template>
      </div>
    
      <el-row class="test__question">
        <section>
          <h3>一、选择题（共5题，每题5分。每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row v-for="(choice,index) in choice" :key="index" class="question__item">
            <h4 :id="'choiceOrder'+index">{{index+1}}.{{choice.question}}</h4>
            <el-radio-group v-model="choiceAnswer[index]" class="item" >
              <el-radio label="1">{{choice.option && choice.option[0]}}</el-radio>
              <el-radio label="2">{{choice.option && choice.option[1]}}</el-radio>
              <el-radio label="3">{{choice.option && choice.option[2]}}</el-radio>
              <el-radio label="4">{{choice.option && choice.option[3]}}</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <section>
          <h3>二、判断题（共5题，每题5分。请根据题目内容选择正确或者错误）</h3>
          <el-row v-for="(judge,index) in judges" :key="index" class="question__item">
            <h4 :id="'judgeOrder'+index">{{index+1}}. {{judge.question}}</h4>
            <el-radio-group v-model="judgeAnswer[index]" class="item">
              <el-radio label="1">正确</el-radio>
              <el-radio label="0">错误</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <section>
          <h3>三、欣赏题（共5题，每题5分。请欣赏完作品后完成选项，每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row v-for="(admiring,index) in admirings" :key="index" class="question__item">
            <h4 :id="'admiringOrder'+index">{{index+1}}.{{admiring.question}}</h4>
            <el-radio-group v-model="admiringAnswer[index]" class="item">
              <el-radio :label="1">{{admiring.option && admiring.option[0]}}</el-radio>
              <el-radio :label="2">{{admiring.option && admiring.option[1]}}</el-radio>
              <el-radio :label="3">{{admiring.option && admiring.option[2]}}</el-radio>
              <el-radio :label="4">{{admiring.option && admiring.option[3]}}</el-radio>
            </el-radio-group>
          </el-row>
        </section>

        <el-row  class="test__handle">
          <el-button type="primary" @click="submit">提交试卷</el-button>
        </el-row>
      </el-row>
    </el-row>
    
    <el-dialog
      title="学生登录/注册"
      :visible.sync="LoginVisible"
      center
      width="40%">
      <el-tabs>
        <el-tab-pane label="学生登录">
          <el-form ref="form" :model="loginForm" label-width="60px">
            <el-form-item label="姓名">
              <el-input v-model="loginForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="loginForm.class" placeholder="请输入班级"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="loginForm.id" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="学生注册">
          <el-form ref="form" :model="registerForm" label-width="60px">
            <el-form-item label="姓名">
              <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="registerForm.class" placeholder="请输入班级 格式3-2 为3年2班"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="registerForm.id" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isLogin: false,
      name: '',
      class: '',
      id: '',
      loginForm:{
        name:'',
        class:'',
        id:''
      },
      registerForm:{
        name:'',
        class:'',
        id:''
      },
      LoginVisible: true,
      choice:[],
      choiceNum: 0,
      choiceAnswer: [],
      judge:[],
      judgeNum: 0,
      judgeAnswer: [],
      admiring:[],
      admiringNum: 0,
      admiringAnswer: []
    }
  },
  created:function(){
    // 获取各类题目数量
    this.choiceNum = this.$route.query.choiceNum || 0
    this.judgeNum = this.$route.query.judgeNum || 0
    this.admiringNum = this.$route.query.admiringNum || 0

    // 获取题库
    this.$axios({
      method: 'POST',
      url: `${API_HOST}Poetry/Library`,
      data: [this.choiceNum, this.judgeNum, this.admiringNum]
    }).then((res) => {
      if(res.status) {
        this.choice = res.data.choice
        this.judge = res.data.judge
        this.admiring = res.data.admiring
      }
    }).catch((err) => {
      this.$message.error(`题库获取失败 ${err}`)
    })
  },
  methods:{
    login(){
      //登录验证
      if(!this.loginForm.name || !this.loginForm.class || !this.loginForm.id) {
        this.$message.warning('请填写完整登录信息')
        return false
      }
      this.$axios({
        method: 'POST',
        url: `${API_HOST}Login`,
        data: {
          name: this.loginForm.name,
          class: this.loginForm.class,
          id: this.id
        }
      }).then((res) => {
        if(!res.data.status) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.isLogin = false
          this.name = this.loginForm.name
          this.class = this.loginForm.class
          this.id = this.loginForm.id
        }
      }).catch((err) => {
        this.$message.error(`登录失败 ${err}`)
      })
    },
    register(){
      //注册验证
      if(!this.registerForm.name || !this.registerForm.class || !this.registerForm.id) {
        this.$message.warning('请填写完整注册信息')
        return false
      }
      this.$axios({
        method: 'POST',
        url: `${API_HOST}Reg`,
        data: {
          name: this.registerForm.name,
          class: this.registerForm.class,
          id: this.registerForm.id
        }
      }).then((res) => {
        if(!res.data.status) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
        }
      }).catch((err) => {
        this.$message.error(`注册失败 ${err}`)
      })
    },
    submit:function(){
      // 登录才可以提交试卷
      if(!this.isLogin) {
        this.$message.warning('登录以后才可以提交试卷')
        return false
      }

    },
  }
}
</script>

<style lang="scss" scoped>
  .test {
    position: absolute;
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
      }
      .test_info {
        margin-bottom: 10px;
        text-align: right;
        font-weight: bold;
          color: #657180;
          font-size: 15px;
        .test_login {
          color: #657180;
          text-decoration: none;
          &:hover {
            color: red;
          }
        }
        .test_student {
          margin-left: 10px;
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
