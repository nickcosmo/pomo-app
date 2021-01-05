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
  height: 16px;
  background: #efefef;
  border-radius: 20px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 40px;
  border-radius: 5px;
  background: #00f6f6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  background: #00f6f6;;
  cursor: pointer;
}
</style>