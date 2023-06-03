/* eslint-disable no-underscore-dangle */
import * as Cesium from 'cesium/Cesium';

//const viewPosition = [116.390404, 39.8800601];
const viewPosition = [109.72, 17.38];
let geojson;

export const addGeojson = async (viewer, selected) => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(...viewPosition, 400000),
    orientation: {
      heading: Cesium.Math.toRadians(0, 0),
      pitch: Cesium.Math.toRadians(-60),
      roll: 0.0,
    },
  });
  if (selected.includes('1')) {
    geojson = await Cesium.GeoJsonDataSource.load('AIS.json', {
      markerColor: Cesium.Color.BLUE,
      markerSize: 12,
    });
    viewer.dataSources.add(geojson);
  }
  if (selected.includes('2')) {
    geojson = await Cesium.GeoJsonDataSource.load('lubiao.json', {
      markerColor: Cesium.Color.YELLOW,
      markerSize: 12,
    });
    viewer.dataSources.add(geojson);
  }
  if (selected.includes('3')) {
    geojson = await Cesium.GeoJsonDataSource.load('chenchuan.json', {
      markerColor: Cesium.Color.CYAN,
      markerSize: 12,
    });
    viewer.dataSources.add(geojson);
  }
  if (selected.includes('4')) {
    geojson = await Cesium.GeoJsonDataSource.load('zhangaiwu.json', {
      markerColor: Cesium.Color.BROWN,
      markerSize: 12,
    });
    viewer.dataSources.add(geojson);
  }
  if (selected.includes('5')) {
    geojson = await Cesium.GeoJsonDataSource.load('jiaoshi.json', {
      markerColor: Cesium.Color.BLACK,
      markerSize: 12,
    });
    viewer.dataSources.add(geojson);
  }
  //geojson = await Cesium.GeoJsonDataSource.load('AIS.json');
  //viewer.dataSources.add(geojson);
};

export const removeGeojson = (viewer) => {
  if (geojson) {
    viewer.dataSources.remove(geojson);
  }
};
