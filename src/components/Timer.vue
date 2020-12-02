<template>
  <div>
    <h3 v-if="status == 'study'">STUDY STUDY STUDY</h3>
    <h3 v-if="status == 'break'">BREAK BREAK BREAK</h3>
    <h1 class="timer">{{ displayMinutes }}:{{ displaySeconds }}</h1>

    <div>
      <button @click="startTimer">START</button>
      <button @click="resetTimer">RESET</button>
    </div>
    <div class="circle-container">
      <div class="outest-circle circle">
        <div
          class="outer-circle circle"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minutes: 1,
      seconds: 0,
      startCount: 0,
      intId: null,
      progressWidth: 0,
      progressSeconds: 0,
      status: "study",
    };
  },
  computed: {
    displayMinutes() {
      if (this.minutes <= 9) {
        return `0${this.minutes}`;
      }
      return this.minutes;
    },
    displaySeconds() {
      if (this.seconds <= 9) {
        return `0${this.seconds}`;
      }
      return this.seconds;
    },
  },
  methods: {
    setTitle() {
      return (document.title = `${this.displayMinutes}:${this.displaySeconds}`);
    },
    startTimer() {
      this.startCount++;
      if (this.startCount === 1) {
        this.intId = setInterval(() => {
          if (this.seconds === 0 && this.minutes === 0) {
            return this.resetTimer();
          }
          if (this.minutes >= 0) {
            if (this.seconds === 0) {
              this.seconds = 59;
              this.minutes--;
            } else {
              this.seconds--;
            }
            this.progressSeconds++;
            this.progressWidth = (this.progressSeconds / 1500) * 100;
            this.setTitle();
          }
        }, 1000);
      }
    },
    resetTimer() {
      if (this.intId) {
        clearInterval(this.intId);
        this.startCount = 0;
        this.progressSeconds = 0;
        this.progressWidth = 0;
        if (this.status === "study") {
          this.status = "break";
          this.minutes = 5;
          this.seconds = 0;
        } else {
          this.status = "study";
          this.minutes = 25;
          this.seconds = 0;
        }
        this.setTitle();
      }
    },
  },
  mounted: function () {
    this.setTitle();
  },
};
</script>

<style scoped>
.timer {
  font-size: 200px;
  color: white;
}

button {
  font-family: inherit;
  font-size: 25px;
  height: 50px;
  outline: none;
  border: 2px solid white;
  background-color: inherit;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0px 10px;
}

button:hover {
  border-color: #00ffff;
  color: #00ffff;
}

.circle-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  display: inline-block;
  height: 20px;
}

.outest-circle {
  display: inline-block;
  width: 700px;
  background-color: #efefef;
}

.outer-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00f3f3;
  animation: fill 25s linear infinite;
}
</style>