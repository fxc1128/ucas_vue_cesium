import * as Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';

export function measureLine(viewer) {
  //测量空间直线距离
  /******************************************* */

  //鼠标会偏差
  // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  var positions = [];
  var poly = null;
  var distance = 0;
  var cartesian = null;
  var floatingPoint;
  var labelPt;

  handler.setInputAction(function (movement) {
    let ray = viewer.camera.getPickRay(movement.endPosition); //Cartesian3_to_WGS84
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian))
      //跳出地球时异常
      return;
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions);
      } else {
        positions.pop();
        positions.push(cartesian);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
    let ray = viewer.camera.getPickRay(movement.position);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian))
      //跳出地球时异常
      return;
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    positions.push(cartesian);
    //记录鼠标单击时的节点位置，异步计算贴地距离
    labelPt = positions[positions.length - 1];
    if (positions.length > 2) {
      getSpaceDistance(positions);
    } else if (positions.length == 2) {
      //在三维场景中添加Label
      floatingPoint = viewer.entities.add({
        name: '空间距离',
        position: labelPt,
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
      });
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function (movement) {
    handler.destroy(); //关闭事件句柄
    handler = undefined;
    positions.pop(); //最后一个点无效
    if (positions.length == 1) viewer.entities.remove(floatingPoint);
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  var PolyLinePrimitive = (function () {
    function _(positions) {
      this.options = {
        name: '直线',
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.CHARTREUSE,
          width: 5,
          clampToGround: true,
        },
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        return _self.positions;
      };
      //实时更新polyline.positions
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      var addedEntity = viewer.entities.add(this.options);
    };

    return _;
  })();

  //空间两点距离计算函数
  function getSpaceDistance(positions) {
    console.log(22);
    //只计算最后一截，与前面累加
    //因move和鼠标左击事件，最后两个点坐标重复
    var i = positions.length - 3;
    var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
    var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
    getTerrainDistance(point1cartographic, point2cartographic);
  }

  function getTerrainDistance(point1cartographic, point2cartographic) {
    var geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    var cartoPts = [point1cartographic];
    for (var jj = 1000; jj < s; jj += 1000) {
      //分段采样计算距离
      var cartoPt = geodesic.interpolateUsingSurfaceDistance(jj);
      cartoPts.push(cartoPt);
    }
    cartoPts.push(point2cartographic);
    //返回两点之间的距离
    var promise = Cesium.sampleTerrain(viewer.terrainProvider, 8, cartoPts).then(function (updatedPositions) {
      for (var jj = 0; jj < updatedPositions.length - 1; jj++) {
        var geoD = new Cesium.EllipsoidGeodesic();
        geoD.setEndPoints(updatedPositions[jj], updatedPositions[jj + 1]);
        var innerS = geoD.surfaceDistance;
        innerS = Math.sqrt(
          Math.pow(innerS, 2) + Math.pow(updatedPositions[jj + 1].height - updatedPositions[jj].height, 2),
        );
        distance += innerS;
      }
      //在三维场景中添加Label
      var lon1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(labelPt).longitude;
      var lat1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(labelPt).latitude;
      var lonLat = '(' + Cesium.Math.toDegrees(lon1).toFixed(2) + ',' + Cesium.Math.toDegrees(lat1).toFixed(2) + ')';
      var textDisance = distance.toFixed(2) + '米';
      if (distance > 10000) textDisance = (distance / 1000.0).toFixed(2) + '千米';
      floatingPoint = viewer.entities.add({
        name: '贴地距离',
        position: labelPt,
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: lonLat + textDisance,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -20),
        },
      });
    });
  }
}

//面积测量
export function measurePolygn(viewer) {
  // 鼠标事件
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  var positions = [];
  var tempPoints = [];
  var polygon = null;
  var cartesian = null;
  var floatingPoint; //浮动点
  handler.setInputAction(function (movement) {
    let ray = viewer.camera.getPickRay(movement.endPosition);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    positions.pop(); //移除最后一个
    positions.push(cartesian);
    if (positions.length >= 2) {
      var dynamicPositions = new Cesium.CallbackProperty(function () {
        return new Cesium.PolygonHierarchy(positions);
        return positions;
      }, false);
      polygon = PolygonPrimitive(dynamicPositions);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
    let ray = viewer.camera.getPickRay(movement.position);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    positions.push(cartesian);
    //在三维场景中添加点
    var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    var heightString = cartographic.height;
    var labelText = '(' + longitudeString.toFixed(2) + ',' + latitudeString.toFixed(2) + ')';
    tempPoints.push({ lon: longitudeString, lat: latitudeString, hei: heightString });
    floatingPoint = viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: labelText,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -20),
      },
    });
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  handler.setInputAction(function (movement) {
    handler.destroy();
    positions.pop();
    var textArea = getArea(tempPoints) + '平方公里';
    viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
      label: {
        text: textArea,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -40),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  var radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad)
  var degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度
  //计算多边形面积
  function getArea(points) {
    var res = 0;
    //拆分三角曲面
    for (var i = 0; i < points.length - 2; i++) {
      var j = (i + 1) % points.length;
      var k = (i + 2) % points.length;
      var totalAngle = Angle(points[i], points[j], points[k]);
      var dis_temp1 = distance(positions[i], positions[j]);
      var dis_temp2 = distance(positions[j], positions[k]);
      res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
    }
    return (res / 1000000.0).toFixed(4);
  }

  /*角度*/
  function Angle(p1, p2, p3) {
    var bearing21 = Bearing(p2, p1);
    var bearing23 = Bearing(p2, p3);
    var angle = bearing21 - bearing23;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
  /*方向*/
  function Bearing(from, to) {
    var lat1 = from.lat * radiansPerDegree;
    var lon1 = from.lon * radiansPerDegree;
    var lat2 = to.lat * radiansPerDegree;
    var lon2 = to.lon * radiansPerDegree;
    var angle = -Math.atan2(
      Math.sin(lon1 - lon2) * Math.cos(lat2),
      Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2),
    );
    if (angle < 0) {
      angle += Math.PI * 2.0;
    }
    angle = angle * degreesPerRadian; //角度
    return angle;
  }

  function PolygonPrimitive(positions) {
    polygon = viewer.entities.add({
      polygon: {
        hierarchy: positions,
        material: Cesium.Color.GREEN.withAlpha(0.1),
      },
    });
  }

  function distance(point1, point2) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
    var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
    /**根据经纬度计算出距离**/
    var geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s;
  }
}

export function clearDrawEntities(viewer) {
  //tempEntities = [];
  // 清除之前的实体
  viewer.entities.removeAll();
  const entitys = viewer.entities._entities._array;
  let length = entitys.length;
  console.log('66', length);
  // 倒叙遍历防止实体减少之后entitys[f]不存在
  for (let f = length - 1; f >= 0; f--) {
    if (entitys[f]._name) {
      viewer.entities.remove(entitys[f]);
    }
  }
}
