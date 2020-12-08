<template>
  <div class="container">
    <h1>Settings</h1>
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
      <slider
        @slide="update"
        :val="longBreakLength"
        length="long-break"
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
      } else if (value[1] === "break") {
        this.breakLength = value[0];
      } else {
        this.longBreakLength = value[0];
      }
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