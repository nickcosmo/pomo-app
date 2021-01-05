<template>
  <app-header></app-header>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style scoped>
html {
  width: 100%;
  margin: none;
}

div,
header {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 100px;
  color: #EFEFEF;
  background-color: #0F0F0F;
}
</style>
