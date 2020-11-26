<template>
  <div>
    <h1 class="timer">
      {{ zeroMinute }}{{ minutes }}:{{ zeroSecond }}{{ seconds }}
    </h1>
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
      runningCount: 0,
      intId: null,
      progressWidth: 0,
      progressSeconds: 0,
    };
  },
  computed: {
    zeroMinute() {
      if (this.minutes <= 9) {
        return 0;
      } else {
        return null;
      }
    },
    zeroSecond() {
      if (this.seconds <= 9) {
        return 0;
      } else {
        return null;
      }
    },
  },
  methods: {
    startTimer() {
      this.runningCount++;
      if (this.runningCount === 1) {
        this.intId = setInterval(() => {
          if(this.seconds === 60 && this.minutes === 0) {
            this.resetTimer();
            return null;
          }

          if (this.minutes >= 0) {
            if (this.seconds === 0) {
              this.seconds = 60;
              this.minutes = this.minutes - 1;
            }
            this.seconds = this.seconds - 1;

            this.progressSeconds++;
            this.progressWidth = (this.progressSeconds / 1500) * 100;
          }
        }, 1000);
      }
    },
    resetTimer() {
      if (this.intId) {
        clearInterval(this.intId);
        this.minutes = 25;
        this.seconds = 0;
        this.runningCount = 0;
        this.progressSeconds = 0;
        this.progressWidth = 0;
      }
    },
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
  border-color: #00FFFF;
  color: #00FFFF;
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