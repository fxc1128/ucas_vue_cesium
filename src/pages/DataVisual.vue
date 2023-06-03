<template>
  <div class="datavisual-page"><MapView></MapView></div>
</template>

<script>
import MapView from './../components/MapView.vue';

export default {
  name: 'DataVisual',
  components: {
    MapView,
  },
};
</script>

<style>
.datavisual-page {
  height: 100%;
  width: 100%;
  background-color: bisque;
}
</style>
