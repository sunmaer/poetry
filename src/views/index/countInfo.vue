<template>
  <el-card class="count"  :body-style="{ padding: '0px' }">
    <el-row>
      <el-col :span="8" class="count__icon" :style="{ backgroundColor: bgColor }">
        <i :class="['fa', 'fa-'+icon, 'fa-2x']"></i>
      </el-col>
      <el-col :span="16">
        <el-row class="count__number"  :style="{ color: bgColor }">{{ number }}</el-row>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-row class="count__types">{{ type }}<a v-if="update" class="count__btn" href="javascript:void(0);">修改</a></el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
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
    .count__types {
      color: #c8c8c8;
      .count__btn {
        margin-left: 5px;
        color: #409EFF;
        text-decoration: none;
      }
    }
  }
</style>
