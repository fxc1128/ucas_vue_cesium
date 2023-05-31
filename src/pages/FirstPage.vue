<template>
  <div id="mainDiv">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统简介</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>功能介绍</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成员信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div v-for="o in 2" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FirstPage',
  components: {},
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 800px;

  margin-top: 50px;
  margin-left: 100px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

#mainDiv {
  width: 100%;
  height: 200%;

  margin: 0px;
  padding: 0px;
  background-color: #8e8f9280;
}
</style>
