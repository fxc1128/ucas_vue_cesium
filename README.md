# 系统介绍

海南自贸港航海保障系统是一个基于 vue 和 CesiumJS 框架的 WebGIS 系统，系统提供了海南自贸港周边 AIS 信号基站、航标、障碍物、礁石、沉船的位置信息，以实现为航行船只更好规划路径，规避风险目的。

系统主界面包含顶部系统名称栏，左侧功能菜单栏以及主窗口，功能菜单栏可是实现页面切换，点击“首页”按钮切换至系统介绍页面，具有系统功能介绍，成员信息等内容；点击“数据”按钮，切换至数据显示页面，在该页面中用户可以实现不同数据图层的展示，以及测量距离，测量面积等主要功能；点击“操作”按钮，切换至数据编辑界面，在该界面中用户可以实现标记绘制，航道绘制，风险区绘制等主要功能，并可以以 json 格式导出所绘制的数据。

# 运行方式

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
