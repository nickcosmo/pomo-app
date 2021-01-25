<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  font-family: inherit;
  font-size: 30px;
  height: 50px;
  outline: none;
  border: 2px solid #EFEFEF;
  background-color: inherit;
  color: #EFEFEF;
  padding: 0px 10px;
  cursor: pointer;
}

button:hover {
  border-color: #00ffff;
  color: #00ffff;
}

@media screen and (max-width: 450px) {
  button {
    font-size: 25px;
  }
}

@media screen and (max-width: 380px) {
  button {
    font-size: 20px;
  }
}

</style>