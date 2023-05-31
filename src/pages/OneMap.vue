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
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      infoBox: false,
      navigationInstructionsInitiallyVisible: false,
    });
    this.viewer._cesiumWidget._creditContainer.style.display = 'none'; //去掉logo
    const viewPosition = [118.77, 32.06];
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(...viewPosition, 10000),
      orientation: {
        heading: Cesium.Math.toRadians(0, 0),
        pitch: Cesium.Math.toRadians(-90),
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
