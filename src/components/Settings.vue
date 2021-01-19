<template>
  <loader :loading="loading"></loader>

  <div class="container">
    <h1>Settings</h1>
    <div class="slider-container">
      <label class="slider-label">study length: {{ studyInterval }}</label>
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
    <div class="input-container" v-if="isLoggedIn">
      <label for="goal" class="goal-label">set daily goal:</label>
      <input
        class="goalInput"
        type="number"
        min="0"
        max="24"
        id="goal"
        name="goal"
        v-model="dailyGoal"
        @blur="updateDailyGoal"
        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
      />
    </div>
    <base-button @click="pushUpdate" v-if="isLoggedIn"
      >save your settings</base-button
    >
  </div>
</template>

<script>
import Slider from "./UI/Slider.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { mapState } from "vuex";
import Loader from './UI/Loader.vue';

export default {
  data() {
    return {
      loading: false,
      dailyGoal: 0
    };
  },
  computed: mapState({
    studyInterval: (state) => state.timerModule.timeSettings.studyInterval,
    breakInterval: (state) => state.timerModule.timeSettings.breakInterval,
    longBreakInterval: (state) =>
      state.timerModule.timeSettings.longBreakInterval,
    isLoggedIn() {
      if (this.$store.state.authModule.isLoggedIn) {
        return true;
      }
      return false;
    },
  }),
  methods: {
    updateDailyGoal() {
      this.$store.dispatch("updateDailyGoal", this.dailyGoal);
    },
    update(values) {
      const pushValues = {
        studyInterval: this.studyInterval,
        breakInterval: this.breakInterval,
        longBreakInterval: this.longBreakInterval,
      };
      if (values[1] === "study") {
        pushValues.studyInterval = values[0];
      } else if (values[1] === "break") {
        pushValues.breakInterval = values[0];
      } else {
        pushValues.longBreakInterval = values[0];
      }
      this.$store.dispatch("updateSettings", pushValues);
    },
    async pushUpdate() {
      const goal = parseInt(this.dailyGoal);
      try {
        this.loading = true;
        await this.$store.dispatch("postSettings", goal);
        this.loading = false;
      } catch(err) {
        this.loading = false;
        console.log(err);
      }
      this.$router.push("timer");
    },
  },
  created() {
    this.dailyGoal = this.$store.state.dashModule.dailyGoal;
  },
  components: {
    Slider,
    BaseButton,
    Loader
  },
};
</script>

<style scoped>
h1 {
  font-size: 60px;
}

input {
  width: 60px;
  font-size: 28px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  border: none;
  outline: none;
  /* padding-left: 20px; */
  margin: 10px;
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

.input-container label,
.input-container input {
  display: inline;
}

.slider-container,
.input-container {
  margin: 10px 0px;
}

button {
  margin-top: 10px 0px;
}

/* Chrome, Safari, Edge, Opera */
.goalInput::-webkit-outer-spin-button,
.goalInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.goalInput[type="number"] {
  -moz-appearance: textfield;
}
</style>