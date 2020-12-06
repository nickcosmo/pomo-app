<template>
  <div>
    <input
      type="range"
      min="0"
      max="10"
      class="slider"
      id="myRange"
      v-model="slide"
    />
  </div>
</template>

<script>
export default {
    data() {
        return {
            slide: 5
        }
    }
};
</script>

<style scoped>
.slider {
    -webkit-appearance: none;
    appearance: none;
    background: #efefef;
    border-radius: 20px;
    outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #9999;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  background: #9999;
  cursor: pointer;
}
</style>