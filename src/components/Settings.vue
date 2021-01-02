<template>
  <div class="container">
    <h1>Settings</h1>
    <div class="slider-container">
      <label>study length: {{ studyInterval }}</label>
      <slider
        @slide="update"
        :val="studyInterval"
        length="study"
        min="15"
        max="45"
        step="5"
      ></slider>
    </div>
    <div class="slider-container">
      <label>break length: {{ breakInterval }}</label>
      <slider
        @slide="update"
        :val="breakInterval"
        length="break"
        min="3"
        max="15"
        step="2"
      ></slider>
    </div>
    <div class="slider-container">
      <label>long break length: {{ longBreakInterval }}</label>
      <slider
        @slide="update"
        :val="longBreakInterval"
        length="long-break"
        min="10"
        max="30"
        step="5"
      ></slider>
    </div>
    <div class="slider-container">
      <label for="goal">set daily goal</label>
      <input type="number" min="0" max="24" id="goal" name="goal" value="0" />
    </div>
    <base-button>update profile</base-button>
  </div>
</template>

<script>
import Slider from "./UI/Slider.vue";
import BaseButton from "./UI/BaseButton.vue";
import { mapState } from "vuex";

export default {
  computed: mapState({
    studyInterval: (state) => state.timeSettings.studyInterval,
    breakInterval: (state) => state.timeSettings.breakInterval,
    longBreakInterval: (state) => state.timeSettings.longBreakInterval,
  }),
  methods: {
    update(values) {
      this.$store.dispatch("updateSettings", values);
    },
  },
  components: {
    Slider,
    BaseButton,
  },
};
</script>

<style scoped>
h1 {
  font-size: 60px;
}

input {
  width: 60%;
  font-size: 28px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  border: none;
  outline: none;
  padding-left: 15px;
}

label {
  display: block;
  font-size: 30px;
}

.container {
  width: 40%;
  margin: auto;
  padding: 10px;
}

.slider-container,
input {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>