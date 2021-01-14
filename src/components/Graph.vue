<template>
  <div class="canvas-container">
    <canvas id="progress-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "goal"],
  methods: {
    createChart(chartId) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Goal",
              borderColor: "#00f6f6",
              data: [this.goal, this.goal, this.goal, this.goal, this.goal, this.goal, this.goal],
              pointRadius: "5",
              pointHitRadius: "1",
            },
            {
              label: "Hours",
              borderColor: "#EFEFEF",
              data: [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday],
              pointRadius: "5",
              pointHitRadius: "1",
            }
          ],
        },
        options: {
          title: {
            display: true,
            fontSize: 20,
            text: "Week at a glance",
            fontColor: "#EFEFEF",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#EFEFEF",
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "#303030",
                  lineWidth: 5,
                },
                ticks: {
                  fontColor: "#EFEFEF",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "#303030",
                  lineWidth: 5,
                },
                ticks: {
                  fontColor: "#EFEFEF",
                  beginAtZero: true
                },
              },
            ],
          },
          // responsive: true,
          // maintainAspectRatio: false,
        },
      });
    },
  },
  mounted() {
    this.createChart("progress-chart");
  },
};
</script>

<style scoped>
.canvas-container {
  margin-top: 15px;
  display: inline-block;
  width: 800px;
  height: 400px;
}
</style>