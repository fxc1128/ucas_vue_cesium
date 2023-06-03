<template>
  <div id="mainDiv">
    <div id="cesiumContainer">
      <CesiumViewer v-if="viewer" :viewer="viewer"></CesiumViewer>
    </div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium';
//import buildModuleUrl from "cesium/Source/Core/buildModuleUrl"
import * as widgets from 'cesium/Widgets/widgets.css';

import CesiumViewer from './../components/DrawView.vue';

export default {
  name: 'MainViewer',
  components: { CesiumViewer },
  data() {
    return {
      viewer: '',
    };
  },
  mounted: function () {
    //设置静态资源目录
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2OTkxY2ZlYS01NjQ1LTQwOTktODc4OS1mNTQ3NTk5NGZjY2YiLCJpZCI6MzE4OTUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTYxMDU3NTl9.MfJB6x_8MAk5sq7VEHu-_OYj4K8ZHdWoirMkjJFvNFg';
    //创建viewer实例
    this.viewer = new Cesium.Viewer('cesiumContainer', {
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
    this.viewer.baseLayerPicker.viewModel.selectedImagery =
      this.viewer.baseLayerPicker.viewModel.imageryProviderViewModels[3];
    this.viewer._cesiumWidget._creditContainer.style.display = 'none'; //去掉logo
    const viewPosition = [109.72, 17.38];
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(...viewPosition, 400000),
      orientation: {
        heading: Cesium.Math.toRadians(0, 0),
        pitch: Cesium.Math.toRadians(-60),
        roll: 0.0,
      },
    });
  },
};
</script>

<style scoped>
#mainDiv {
  width: 100%;
  height: 100%;
}
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
