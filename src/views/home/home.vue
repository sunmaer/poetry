<template>
  <el-row class="home">
    <el-row class="home__container">
      <el-col :span="12" class="home__link"><a href="http://www.szchengnan.com/" target="_blank">嵊州市城南小学欢迎你</a></el-col>
      <el-col :span="12" class="home__test">
        <router-link :to="{ path: '/login' }">管理员登录</router-link>&nbsp;&nbsp;
        <a href="javascript:void(0);" @click="dialogVisible = true">{{ type }}在线测试 <i class="fa fa-arrow-circle-o-right"></i></a>
      </el-col>
      <el-col :span="24">
        <img class="home__logo" src="../../assets/logo.jpg" alt="校园全景">
      </el-col>
    </el-row>

    <el-dialog
      title="选择题量"
      :visible.sync="dialogVisible"
      width="30%">
      <span>总题数：<strong>{{ number }}</strong></span>
      <span :style="{color: warningcolor}">已选题数: {{chooseNumber}} </span>
      <el-row class="test__num">
        <span>选择题：</span>
        <el-input-number 
          v-model="num1"
          :min="0" 
          :max="number"
          size="small" 
          label="选择题"></el-input-number>
      </el-row>

      <el-row class="test__num">
        <span>判断题：</span>
        <el-input-number 
          v-model="num2"
          :min="0" 
          :max="number"
          size="small" 
          label="判断题"></el-input-number>
      </el-row>

      <el-row class="test__num">
        <span>欣赏题：</span>
        <el-input-number 
          v-model="num3"
          :min="0" 
          :max="number"
          size="small" 
          label="欣赏题"></el-input-number>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    props:{
      warningcolor:{
        type:String,
        default:'black'
      }
    },
    data () {
      return {
        type: '越韵古诗',
        dialogVisible: false,
        number: 0,
        num1: 5,
        num2: 5,
        num3: 5
      }
    },
    computed:{
      chooseNumber:function(){
        if(this.num1+this.num2+this.num3 > this.number){
          this.warningcolor = 'red';
        }else{
          this.warningcolor = 'black';
        }
        return this.num1+this.num2+this.num3;
      }
    },
    methods: {
      confirm () {
        if(this.num1+this.num2+this.num3 != this.number){
          this.$message({
            message:'题目数不符合要求',
            type:'warning'
          });
          return false;
        }
        this.$router.push({path:'/test',query:{total:this.number,choice:this.num1,judge:this.num2,admiring:this.num3}});
      }
    },
    //页面加载读取题目数量
    mounted () {
      axios.get(API_HOST+'Global/QuestionNum')
      .then((res) => {
        res = res.data;
        if(res.status == true){
          this.number = parseInt(res.questionNum)
          if(this.number === 20) {
            this.num1 = 10
            this.num2 = 5
            this.num3 = 5
          } else if(this.number === 25) {
            this.num1 = 10
            this.num2 = 10
            this.num3 = 5 
          } else {
            this.num1 = 20
            this.num2 = 20
            this.num3 = 10
          }
        }
      })
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
      height: 200px;
      line-height: 200px;
      a {
        font-size: 28px;
        color: #000;
        text-decoration: none;
      }
    }
    .home__test {
      position: relative;
      height: 200px;
      text-align: right;
      a {
        position: relative;
        top: 190px;
        font-size: 18px;
        color: #000;
        text-decoration: none;
        &:hover {
          color: red;
        }
      }
    }
    .home__logo {
      margin-top: 40px;
      width: 100%;
      box-shadow: 7px 7px 10px #888888;
    }
    .test__num {
      margin-top: 15px;
    }
  }
</style>
