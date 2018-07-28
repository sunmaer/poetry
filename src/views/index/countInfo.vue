<template>
  <el-card class="count" :body-style="{ padding: '0px' }">
    <el-row>
      <el-col :span="8" class="count__icon" :style="{ backgroundColor: bgColor }">
        <i :class="['fa', 'fa-'+icon, 'fa-2x']"></i>
      </el-col>
      <el-col :span="16">
        <el-row v-if="input" class="count__input">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="25" value="25"></el-option>
            <el-option label="50" value="50"></el-option>
          </el-select>
        </el-row>
        <el-row v-else class="count__number" :style="{ color: bgColor }">{{ number }}</el-row>
        <el-row class="count__types">
          {{ type }}
          <span v-if="update">
            <a v-if="link" @click="alter" class="count__btn" href="javascript:void(0);">{{ btnName }}</a>
            <a v-else @click="confirm" class="count__btn" href="javascript:void(0);">{{ btnName }}</a>
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'CountInfo',
    props: {
      bgColor: {
        type: String,
        default: '#409EFF'
      },
      icon: {
        type: String,
        default: 'user-plus'
      },
      number: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: '总数'
      },
      update: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        input: false,
        btnName: '修改',
        link: true,
      }
    },
    methods: {
      alter () {
        this.input = !this.input
        this.btnName = '确认'
        this.link = !this.link
      },
      confirm : function(){
        if(this.number != ''){
          this.input = !this.input;
          this.btnName = '修改';
          this.link = !this.link;
          axios.post(API_HOST+'Global/QuestionNum',{
            questionNum:this.number
          })
          .then((res) => {
            if(res.data.status){
              this.$message.success(res.data.msg)
            }else{
              this.$message.error('修改失败')
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
        }else{
          this.$message.error('不得为空')
          return false
        }
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .count {
    width: 100%;
    height: 140px;
    color: #657180;
    text-align: center;
    box-shadow: none;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .count__icon {
      line-height: 140px;
      color: #ffffff;
      .fa {
        margin-top: 60px;
      }
    }
    .count__number {
      margin-top: 35px;
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
    }
    .count__input {
      margin: 35px 25px 7px 25px;
    }
    .count__types {
      color: #c8c8c8;
      .count__btn {
        color: #409EFF;
        text-decoration: none;
      }
    }
  }
</style>
