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
          <el-button type="text" @click="studentExit">退出登录</el-button>
        </template>
      </div>
    
      <el-row class="test__question">
        <h2 v-if="showGrade" class="test__grade">分数：<span>{{ grade }}</span>（{{ level }}）</h2>
        <section>
          <h3>一、选择题（共{{choiceNum}}题，每题{{100 / +total}}分。每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row v-for="(choice,index) in choice" :key="index" class="question__item">
            <h4>{{index+1}}. {{choice.question}}</h4>
            <div v-if="choice.image" class="test__image">
              <img :src="choice.image" alt="古诗配图" :onerror="errorImg"  @click="enlarge(choice.image)">
            </div>
            <el-radio-group :disabled="disable" v-model="choiceAnswer[index]" class="item" >
              <el-radio :label="1">{{choice.option && choice.option[0]}}</el-radio>
              <el-radio :label="2">{{choice.option && choice.option[1]}}</el-radio>
              <el-radio :label="3">{{choice.option && choice.option[2]}}</el-radio>
              <el-radio :label="4">{{choice.option && choice.option[3]}}</el-radio>
            </el-radio-group>
            <h4 v-if="showAnswer && choiceAnswerAna[index]" :style="{color: choiceAnswerAna[index].color, margin: '10px 0 0 20px'}">{{ getRightAnswer('choice', index) }}</h4>
            <div class="test__ana" v-if="showAnswer && choice.analysis && choice.analysis !== 'undefined'">
              解析：{{ choice.analysis }}
            </div>
          </el-row>
        </section>

        <!-- 图片放大功能 -->
        <el-dialog
          title="图片"
          :visible.sync="enlargeVisible"
          width="70%">
          <img :src="enlargeimg">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <section>
          <h3>二、判断题（共{{judgeNum}}题，每题{{100 / +total}}分。请根据题目内容选择正确或者错误）</h3>
          <el-row v-for="(judge,index) in judge" :key="index" class="question__item">
            <h4>{{index+1}}. {{judge.question}}</h4>
            <div v-if="judge.image" class="test__image">
              <img :src="'//' + judge.image" alt="古诗配图">
            </div>
            <el-radio-group :disabled="disable" v-model="judgeAnswer[index]" class="item">
              <el-radio :label="1">正确</el-radio>
              <el-radio :label="0">错误</el-radio>
            </el-radio-group>
            <h4 v-if="showAnswer && judgeAnswerAna[index]" :style="{color: judgeAnswerAna[index].color, margin: '10px 0 0 20px'}">{{ getRightAnswer('judge', index) }}</h4>
            <div class="test__ana" v-if="showAnswer && judge.analysis && judge.analysis !== 'undefined'">
              解析：{{ judge.analysis }}
            </div>
          </el-row>
        </section>

        <section>
          <h3>三、欣赏题（共{{admiringNum}}题，每题{{100 / +total}}分。请欣赏完作品后完成选项，每题只有一个答案是正确的，请从四个备选答案中选出正确选项）</h3>
          <el-row v-for="(admiring,index) in admiring" :key="index" class="question__item">
            <h4>{{index+1}}. {{admiring.question}}</h4>
            <div v-if="isimage[index]" class="test__image">
              <img :src="admiring.video" alt="古诗配图" :onerror="errorImg"  @click="enlarge(admiring.video)">
            </div>
            <div v-if="isvideo[index]" class="test__video">
              <video-player  class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOptions[index]"
                  :playsinline="true"
                  customEventName="customstatechangedeventname">
              </video-player>
            </div>
            <el-radio-group :disabled="disable" v-model="admiringAnswer[index]" class="item">
              <el-radio :label="1">{{admiring.option && admiring.option[0]}}</el-radio>
              <el-radio :label="2">{{admiring.option && admiring.option[1]}}</el-radio>
              <el-radio :label="3">{{admiring.option && admiring.option[2]}}</el-radio>
              <el-radio :label="4">{{admiring.option && admiring.option[3]}}</el-radio>
            </el-radio-group>
            <h4 v-if="showAnswer && admiringAnswerAna[index]" :style="{color: admiringAnswerAna[index].color, margin: '10px 0 0 20px'}">{{ getRightAnswer('admiring', index) }}</h4>            
            <div class="test__ana" v-if="showAnswer && admiring.analysis && admiring.analysis !== 'undefined'">
              解析：{{ admiring.analysis }}
            </div>
          </el-row>
        </section>

        <el-row  class="test__handle">
          <el-button :disabled="disable" type="primary" @click="submit">提交试卷</el-button>
        </el-row>
      </el-row>
    </el-row>
    
    <el-dialog
      title="登录/注册"
      :visible.sync="LoginVisible"
      center
      width="400px">
      <el-tabs>
        <el-tab-pane label="学生登录">
          <el-form ref="form" :model="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.class" placeholder="请输入班级"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.id" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="test__btn" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="学生注册">
          <el-form ref="form" :model="registerForm">
            <el-form-item>
              <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerForm.class" placeholder="请输入班级，例如101"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerForm.id" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="test__btn" type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-row>
</template>

<script>
import axios from 'axios'
import 'babel-polyfill'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player'



export default {
  data () {
    return {
      isLogin: false,
      LoginVisible: true,
      enlargeVisible: false,
      enlargeimg:'',
      enlargeimgWidth:300,
      grade: 0,
      level: '',
      showGrade: false,
      // 试卷批改成功
      disable: false,
      // 试卷答案
      showAnswer: false,
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
      total: 1,
      // 选择题题库
      choice:[],
      // 选择题数量
      choiceNum: 0,
      // 选择题提交试卷答案
      choiceAnswer: [],
      // 选择题答案解析
      choiceAnswerAna: [],
      judge:[],
      judgeNum: 0,
      judgeAnswer: [],
      judgeAnswerAna: [],
      admiring:[],
      admiringNum: 0,
      admiringAnswer: [],
      admiringAnswerAna: [],
      playerOptions: [],
      isimage:[],
      isvideo:[],
      errorImg: 'this.src="' + require('../../assets/seize.jpg') + '"'
    }
  },
  created:function(){
    // 获取各类题目数量
    this.total = this.$route.query.total || 1
    this.choiceNum = this.$route.query.choice || 0
    this.judgeNum = this.$route.query.judge || 0
    this.admiringNum = this.$route.query.admiring || 0


    // 获取题库
    this.$axios.defaults.withCredentials=true;
    this.$axios({
      method: 'POST',
      url: `${API_HOST}Poetry/Library`,
      data: {
        num: [this.choiceNum, this.judgeNum, this.admiringNum]
      },
    }).then((res) => {
      if(res.data.status) {
        this.choice = res.data.data.choice
        //处理图片路径
        for(var i = 0; i < this.choice.length; i++){     
          if(this.choice[i].image){
            var url = this.choice[i].image;
            url = url.substr(0,7).toLowerCase() == "http://" ? url : "http://" + url;
            this.choice[i].image = url;
          }
        }
        this.judge = res.data.data.judge
        this.admiring = res.data.data.admiring
        for(var i = 0; i < this.admiring.length; i++){
          if(this.admiring[i].video){
            var flag = false;
            var arr = ["jpg","png","gif","bmp","jpeg"];
            var url = this.admiring[i].video;
            url = url.substr(0,7).toLowerCase() == "http://" ? url : "http://" + url;
            this.admiring[i].video = url
            //判断是视频还是图片
            var index = url.lastIndexOf('.')
            var ext = url.substr(index+1)
            for(var j = 0;j < arr.length; j++){
              if(ext == arr[j])
              {
                flag = true; //一旦找到合适的，立即退出循环
                break;
              }
            }
            if(flag){
              this.isimage.push(true)
              this.isvideo.push(false)
            }else{
              this.isimage.push(false)
              this.isvideo.push(true)
            } 
          }
          var videoNode = {
            // videojs options
            language: 'zh-CN',
            sources: [{
              type: "video/mp4",
              src: url
            }],
            poster: "",
            height:400,
            width:540
          }
          this.playerOptions.push(videoNode);
        }
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch((err) => {
      console.log(err);
      this.$message.error(`题库获取失败 ${err}`)
    })
  },
  components: {
    videoPlayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
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
          id: this.loginForm.id
        }
      }).then((res) => {
        if(!res.data.status) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.LoginVisible = false
          this.isLogin = true
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
          this.LoginVisible = false
          this.isLogin = true
          this.name = this.registerForm.name
          this.class = this.registerForm.class
          this.id = this.registerForm.id
        }
      }).catch((err) => {
        this.$message.error(`注册失败 ${err}`)
      })
    },
    studentExit(){
      //学生退出登录
      this.$confirm('是否确认退出当前账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isLogin = false
        this.name = ''
        this.class = ''
        this.id = ''
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      })       
    },
    submit:function(){
      // 登录才可以提交试卷
      if(!this.isLogin) {
        this.$message.warning('登录以后才可以提交试卷')
        this.LoginVisible = true
        return false
      }
      // 试卷完成才能提交
      if(this.choiceAnswer.length !== +this.choiceNum || 
        this.judgeAnswer.length !== +this.judgeNum || 
        this.admiringAnswer.length !== +this.admiringNum) {
          this.$message.warning('试卷全部完成才可以提交试卷')
          return false
      }
      this.$axios({
        method: 'POST',
        url: `${API_HOST}Poetry/Grade`,
        data: {
          id: this.id,
          answer: [this.choiceAnswer, this.judgeAnswer, this.admiringAnswer]
        }
      }).then((res) => {
        if(res.data && res.data.status) {
          this.grade = parseInt(res.data.data.grade)
          let tips = ''
          if(this.grade > 85) {
            tips = '非常棒！'
            this.level = '优秀'
          } else if(this.grade <= 85 && this.grade > 70) {
            tips = '考的不错呀！'
            this.level = '良好'
          } else if(this.grade <= 70 && this.grade > 60) {
            tips = '你已经通过考查！'
            this.level = '及格'
          } else {
            tips = '请继续努力！'
            this.level = '不及格'
          }
          this.showGrade = true
          this.disable = true
          this.$message.success(`试卷批改成功，${this.name}，你的分数为${this.grade}，${tips}`)
          // 显示正确答案
          this.showAnswer = true
          let rightAnswer = res.data.data.right_answer
          // 选择题答案解析
          rightAnswer[0].forEach((item, index) => {
            if(item === this.choiceAnswer[index]) {
              this.choiceAnswerAna.push({
                isCorrect: true,
                answer: item,
                color: '#67C23A'
              })
            } else {
              this.choiceAnswerAna.push({
                isCorrect: false,
                answer: item,
                color: '#F56C6C'
              })
            }
          })
          // 判断题答案解析
          rightAnswer[1].forEach((item, index) => {
            if(item === this.judgeAnswer[index]) {
              this.judgeAnswerAna.push({
                isCorrect: true,
                answer: item,
                color: '#67C23A'
              })
            } else {
              this.judgeAnswerAna.push({
                isCorrect: false,
                answer: item,
                color: '#F56C6C'
              })
            }
          })
          // 欣赏题答案解析
          rightAnswer[2].forEach((item, index) => {
            if(item === this.admiringAnswer[index]) {
              this.admiringAnswerAna.push({
                isCorrect: true,
                answer: item,
                color: '#67C23A'
              })
            } else {
              this.admiringAnswerAna.push({
                isCorrect: false,
                answer: item,
                color: '#F56C6C'
              })
            }
          })
        }
      }).catch((err) => {
        this.$message.error(`提交试卷失败 ${err}`)
      })
    },
    getRightAnswer (type, index) {
      if(type === 'choice') {
        return this.choiceAnswerAna[index].isCorrect ?
          '答案正确' :
          '答案错误，正确答案为：' + this.choice[index].option[this.choiceAnswerAna[index].answer-1]
      } else if(type === 'judge') {
        let answer = this.judgeAnswerAna[index].answer === 1 ? '正确' : '错误'
        return this.judgeAnswerAna[index].isCorrect ?
          '答案正确' : 
          '答案错误，正确答案为：' + answer
      } else {
        return this.admiringAnswerAna[index].isCorrect ?
          '答案正确' :
          '答案错误，正确答案为：' + this.admiring[index].option[this.admiringAnswerAna[index].answer-1]
      }
    },
    enlarge(_this){
      var img = new Image()
      img.src = _this
      this.enlargeVisible = true
      this.enlargeimg = _this
    }
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
            color: #F56C6C;
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
        .test__grade {
          font-size: 30px;
          text-align: right;
          span {
            color: #F56C6C;
            font-size: 45px;
          }
        }
        .question__item {
          padding: 0 20px;
          h4 {
            margin: 10px 0;
          }
          .item {
            margin: 10px 20px;
          }
        }
        .test__image {
          margin: 10px auto;
          max-width: 400px;
          img {
            width: 100%;
          }
        }
        .test__ana {
          margin: 10px 20px;
          line-height: 25px;
        }
        .test__handle {
          margin: 40px 0 20px;
          text-align: center;
        }
      }
    }
    .test__btn {
      width: 100%;
    }
  }
</style>
