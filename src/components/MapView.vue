<template>
  <div id="mapview">
    <el-row>
      <el-button type="info" @click="measureLClicked">距离测量</el-button>
      <el-button type="info" @click="measurePClicked">面积测量</el-button>
      <el-button type="info" @click="clearClicked">清空</el-button>
    </el-row>
    <div id="layerControl">
      <label><input type="checkbox" value="1" v-model="selectedLayers" />AIS基站</label>
      <label><input type="checkbox" value="2" v-model="selectedLayers" />航标</label>
      <label><input type="checkbox" value="3" v-model="selectedLayers" />沉船点</label>
      <label><input type="checkbox" value="4" v-model="selectedLayers" />障碍物</label>
      <label><input type="checkbox" value="5" v-model="selectedLayers" />礁石</label>
    </div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium';
import * as widgets from 'cesium/Widgets/widgets.css';
import { addGeojson } from '@/func/addGeojson';
import { measureLine, clearDrawEntities, measurePolygn } from '@/func/cesiumMeasure';

export default {
  name: 'MapView',
  mounted() {
    //组件初始化完成后，挂载到父容器中后触发
    this.initEarth();
    //addGeojson(viewer3D);
  },
  data() {
    //保存组件的私有数据
    return {
      earth: undefined,
      selectedLayers: [],
    };
  },
  watch: {
    selectedLayers() {
      this.updateLayers();
    },
  },
  methods: {
    async updateLayers() {
      // 移除所有数据源
      this.earth.dataSources.removeAll();
      addGeojson(this.earth, this.selectedLayers);
    },
    measureLClicked() {
      console.log('11');
      measureLine(this.earth);
    },
    measurePClicked() {
      console.log('34');
      measurePolygn(this.earth);
    },
    clearClicked() {
      console.log('44');
      clearDrawEntities(this.earth);
    },
    //定义组件的方法
    //定义组件的方法
    async initEarth() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2OTkxY2ZlYS01NjQ1LTQwOTktODc4OS1mNTQ3NTk5NGZjY2YiLCJpZCI6MzE4OTUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTYxMDU3NTl9.MfJB6x_8MAk5sq7VEHu-_OYj4K8ZHdWoirMkjJFvNFg';
      this.earth = new Cesium.Viewer('mapview', {
        shouldAnimate: true,
        //控制视图动画播放速度
        animation: false,
        vrButton: false,
        //搜索按钮
        geocoder: false,
        //视角返回初始位置
        homeButton: false,
        //二三维视角选择
        sceneModePicker: true,
        //时间线，允许用户选择
        timeline: true,
        //导航帮助按钮
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        baseLayerPicker: true,

        fullscreenButton: false,
        selectionIndicator: false,
      });
      this.earth.baseLayerPicker.viewModel.selectedImagery =
        this.earth.baseLayerPicker.viewModel.imageryProviderViewModels[6];
      this.earth._cesiumWidget._creditContainer.style.display = 'none';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mapview {
  width: 100%;
  height: 100%;

  margin: 0px;
  padding: 0px;
  background-color: #8e8f92;
}
#layerControl label {
  font-family: '微软雅黑', Times, serif;
  font-size: 14px;
  color: #ffffff;
}
</style>
