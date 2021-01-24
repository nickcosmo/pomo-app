<template>
  <div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="slider"
      id="myRange"
      v-model="slide"
      @change="update()"
    />
  </div>
</template>

<script>
export default {
  props: ["val", "length", "min", "max", "step"],
  data() {
    return {
      slide: this.val,
    };
  },
  methods: {
    update() {
      const slideVal = parseInt(this.slide);
      this.$emit("slide", [slideVal, this.length]);
    },
  },
  emits: ["slide"],
};
</script>

<style scoped>
div {
  margin: 10px 0px;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 16px;
  background: #efefef;
  border-radius: 20px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 24px;
  border-radius: 5px;
  background: #00f6f6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  background: #00f6f6;;
  cursor: pointer;
}
</style>