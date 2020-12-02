<template>
  <button>
      <slot></slot>
  </button>
</template>

<script>
export default {
}
</script>

<style scoped>
button {
  font-family: inherit;
  font-size: 25px;
  height: 50px;
  outline: none;
  border: 2px solid white;
  background-color: inherit;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0px 10px;
}

button:hover {
  border-color: #00ffff;
  color: #00ffff;
}
</style>