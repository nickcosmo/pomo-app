<template>
  <div>
    <input
      type="range"
      min="0"
      max="10"
      class="slider"
      id="myRange"
      v-model="slide"
      @change="update()"
    />
  </div>
</template>

<script>
export default {
  props: ["val", "length"],
  data() {
    return {
      slide: this.val,
      
    };
  },
  methods: {
    update() {
      this.$emit("slide", [this.slide, this.length]);
    },
  },
  emits: ["slide"],
};
</script>

<style scoped>
div {
  margin-top: 10px;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 60%;
  height: 30px;
  background: #efefef;
  border-radius: 20px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #9999;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  background: #9999;
  cursor: pointer;
}
</style>