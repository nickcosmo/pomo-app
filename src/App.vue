<template>
  <app-header></app-header>
  <div>
      <timer></timer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Timer from './components/Timer.vue';

export default {
  components: {
    Timer,
    AppHeader,
  }
}
</script>

<style scoped>
html {
  width: 100%;
  margin: none;
}

div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 100px;
  color: white;
}
</style>
