<template>
  <div id="mainDiv">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统简介</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div>海南自贸港航海保障系统是一个基于vue和CesiumJS框架的WebGIS系统，</div>
      <div>系统提供了海南自贸港周边AIS信号基站、航标、障碍物、礁石、沉船的</div>
      <div>位置信息，旨在实现为航行船只更好规划路径，规避风险目的。</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>功能介绍</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div>系统主界面包含顶部系统名称栏，左侧功能菜单栏以及主窗口。</div>
      <div>功能菜单栏可是实现页面切换:</div>
      <div>1.点击“首页”按钮切换至系统介绍页面，具有系统功能介绍，成员信息等内容；</div>
      <div>
        2.点击“数据”按钮，切换至数据显示页面，在该页面中用户可以实现不同数据图层的展示，以及测量距离，测量面积等主要功能；
      </div>
      <div>
        3.点击“操作”按钮，切换至数据编辑界面，在该界面中用户可以实现标记绘制，航道绘制，风险区绘制等主要功能，并可以以json格式导出所绘制的数据。
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成员信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div>樊星辰 学号：202218006010040 中国科学院地理科学与资源研究所 工作内容：前端开发，矢量编辑</div>
      <div>康力成 学号：202228006010004 中国科学院地理科学与资源研究所 工作内容：数据采集，数据显示</div>
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
.text {
  font-size: 14px;
  color: rgb(255, 255, 255);
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
  background-color: #ffffff;
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
  height: 85%;

  margin: 0px;
  padding: -50px;
  background-color: #d2d2d2;
}
</style>
