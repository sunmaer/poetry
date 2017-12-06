<template>
  <el-card class="count"  :body-style="{ padding: '0px' }">
    <el-row>
      <el-col :span="8" class="count__icon" :style="{ backgroundColor: bgColor }">
        <i :class="['fa', 'fa-'+icon, 'fa-3x']"></i>
      </el-col>
      <el-col :span="16">
        <el-row class="count__number"  :style="{ color: bgColor }">{{ number }}</el-row>
        <el-row class="count__types">{{ type }}</el-row>
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
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .count {
    width: 100%;
    height: 210px;
    color: #657180;
    text-align: center;
    box-shadow: none;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .count__icon {
      line-height: 210px;
      color: #ffffff;
    }
    .count__number {
      margin-top: 65px;
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
    }
    .count__types {
      color: #c8c8c8;
    }
  }
</style>
