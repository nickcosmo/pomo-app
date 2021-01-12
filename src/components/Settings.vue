<template>
  <div class="container">
    <h1>Settings</h1>
    <div class="slider-container">
      <label class="slider-label">study length: {{ studyInterval }}</label>
      <slider
        @slide="update"
        :val="studyInterval"
        length="study"
        min="1"
        max="45"
        step="5"
      ></slider>
    </div>
    <div class="slider-container">
      <label class="slider-label">break length: {{ breakInterval }}</label>
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
      <label class="slider-label"
        >long break length: {{ longBreakInterval }}</label
      >
      <slider
        @slide="update"
        :val="longBreakInterval"
        length="long-break"
        min="10"
        max="30"
        step="5"
      ></slider>
    </div>
    <div class="input-container">
      <label for="goal" class="goal-label">set daily goal:</label>
      <input type="number" min="0" max="24" id="goal" name="goal" value="0" />
    </div>
    <base-button @click="pushUpdate">update profile</base-button>
  </div>
</template>

<script>
import Slider from "./UI/Slider.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { mapState } from "vuex";

export default {
  computed: mapState({
    studyInterval: (state) => state.timerModule.timeSettings.studyInterval,
    breakInterval: (state) => state.timerModule.timeSettings.breakInterval,
    longBreakInterval: (state) => state.timerModule.timeSettings.longBreakInterval,
  }),
  methods: {
    update(values) {
      const pushValues = {
        studyInterval: this.studyInterval,
        breakInterval: this.breakInterval,
        longBreakInterval: this.longBreakInterval
      };
      if(values[1] === "study") {
        pushValues.studyInterval = values[0];
      } else if (values[1] === "break") {
        pushValues.breakInterval = values[0];
      } else {
        pushValues.longBreakInterval = values[0];
      }
      this.$store.dispatch("updateSettings", pushValues);
    },
    pushUpdate() {
      this.$store.dispatch("postSettings");
      this.$router.push("timer");
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
  width: 10%;
  font-size: 28px;
  height: 30px;
  text-align: left;
  border-radius: 20px;
  border: none;
  outline: none;
  padding-left: 12px;
  margin-left: 20px;
}

label {
  display: block;
  font-size: 30px;
}

.container {
  width: 30%;
  margin: auto;
  padding: 10px;
  text-align: left;
}

.input-container label, .input-container input {
  display: inline;
}

.slider-container,
.input-container,
input {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>