<template>
  <div class="container">
    <h1 class="timer">{{ displayMinutes }}:{{ displaySeconds }}</h1>
    <div>
      <base-button @click="pauseTimer">pause</base-button>
      <base-button @click="startTimer">start</base-button>
      <!-- <base-button @click="resetTimer">NEXT</base-button> -->
    </div>
    <div class="bar-container">
      <div class="outer-bar bar">
        <h3 class="count">count: {{ pomodoroCount }}/4</h3>
        <div
          class="inner-bar bar"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
    <div class="count"></div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["displayMinutes", "displaySeconds"]),
    progressSeconds() {
      return this.$store.state.timerModule.progressSeconds;
    },
    progressWidth() {
      return this.$store.state.timerModule.progressWidth;
    },
    pomodoroCount() {
      return this.$store.state.timerModule.pomodoroCount;
    },
  },
  methods: {
    startTimer() {
      this.$store.dispatch("startTimer");
    },
    resetTimer() {
      this.$store.dispatch("resetTimer");
    },
    pauseTimer() {
      this.$store.commit("pauseTimer");
    },
  },
  mounted() {
    this.$store.commit("initMinutes");
  },
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.count {
  color: #0f0f0f;
  font-size: 1.25rem;
  position: absolute;
  top: 50%;
  margin-top: -13px;
  left: 50%;
  margin-left: -60px;
  z-index: 30;
}

.timer {
  font-size: 23em;
  color: #efefef;
}

.bar-container {
  margin-top: 20px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  position: relative;
}

.bar {
  display: inline-block;
  height: 30px;
}

.outer-bar {
  display: inline-block;
  width: 100%;
  background-color: #efefef;
}

.inner-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00f3f3;
  animation: fill 25s linear infinite;
}

button {
  margin: 0px 10px;
}

@media screen and (max-width: 800px) {
  .timer {
    font-size: 20em;
  }
}

@media screen and (max-width: 700px) {
  .timer {
    font-size: 17em;
  }
}

@media screen and (max-width: 550px) {
  .timer {
    font-size: 15em;
  }
}

@media screen and (max-width: 450px) {
  .timer {
    font-size: 12em;
  }
}

@media screen and (max-width: 380px) {
  .timer {
    font-size: 10em;
  }
  .count {
    font-size: 2em;
  }
}
</style>