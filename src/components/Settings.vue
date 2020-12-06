<template>
  <h1>settings</h1>
  <div>
    <label>study length</label>
    <slider></slider>
  </div>
  <div>
    <label>break length</label>
    <slider></slider>
  </div>
  <div>
    <label>long break length</label>
    <slider></slider>
  </div>
</template>

<script>
import Slider from "./UI/Slider.vue";

export default {
  data() {
    return {};
  },
  components: {
    Slider,
  },
};
</script>

<style scoped>
</style>