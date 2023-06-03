<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">海南自贸港航海保障系统</el-header>
      <el-container class="app-content-pannel">
        <el-aside class="sys-menu">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="handleMenuSelect"
            :collapse="true"
            background-color="#606266"
          >
            <el-menu-item index="1">
              <i class="el-icon-monitor"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">数据</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-map-location"></i>
              <span slot="title">操作</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="sys-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//import MapView from './components/MapView.vue';
export default {
  name: 'App',
  components: {
    //MapView,
  },
  methods: {
    handleMenuSelect(index) {
      console.log(index);
      if (index === '1') {
        this.$router.push('/first');
      } else if (index === '2') {
        // this.$router.push() 可以通过修改url实现路由跳转
        this.$router.push('/');
      } else if (index === '3') {
        // this.$router.push() 可以通过修改url实现路由跳转
        this.$router.push('/onemap');
      }
    },
  },
};
</script>

<style>
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
}
.app-out-pannel,
.app-content-pannel {
  height: 100%;
}
.sys-header {
  background-color: #303133;
  line-height: 60px;
  height: 60px;
  color: #fff;
  font-size: 600;
}
.sys-menu {
  background-color: #606266;
  width: 60px !important;
  overflow: hidden;
}
.sys-content {
  padding: 5px;
}
</style>
