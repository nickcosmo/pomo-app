<template>
  <div class="container">
    <h1>settings</h1>
    <div class="slider-container">
      <label>study length: {{ studyLength }}</label>
      <slider @slide="update" :val="studyLength" length="study"></slider>
    </div>
    <div class="slider-container">
      <label>break length: {{ breakLength }}</label>
      <slider @slide="update" :val="breakLength" length="break"></slider>
    </div>
    <div class="slider-container">
      <label>long break length: {{ longBreakLength }}</label>
      <slider @slide="update" :val="longBreakLength" length="long-break"></slider>
    </div>
    <base-button>update profile</base-button>
  </div>
</template>

<script>
import Slider from "./UI/Slider.vue";
import BaseButton from "./UI/BaseButton.vue";

export default {
  data() {
    return {
      studyLength: 5,
      breakLength: 5,
      longBreakLength: 5,
    };
  },
  methods: {
    update(value) {
      if (value[1] === "study") {
        this.studyLength = value[0];
      }
      else if (value[1] === "break") {
        this.breakLength = value[0];
      } else {
        this.longBreakLength = value[0];
      }
    },
  },
  components: {
    Slider,
    BaseButton
  },
};
</script>

<style scoped>
h1 {
  font-size: 60px;
}

label {
  font-size: 30px;
}

.container {
  width: 40%;
  margin: auto;
  border: 2px solid #efefef;
  padding: 10px;
}

.slider-container {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>