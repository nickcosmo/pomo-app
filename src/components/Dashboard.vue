<template>
<div class="container">
  <div class="data">
    <h1>Dashboard</h1>
    <p>Today's Hours: 5</p>
    <p>This Weeks Hours: 10</p>
    <p>All Time Hours: 100</p>
  </div>
  <graph></graph>
</div>
  <div>

  </div>
</template>

<script>
import Graph from '@/components/Graph.vue';

export default {
  components: {
    Graph
  }
}
</script>

<style scoped>
h1 {
  font-size: 60px;
}

p {
  font-size: 30px;
}

.data {
  text-align: left;
  padding-left: 40px;
}

.container {
  display: inline-block;
  width: 800px;
}

</style>