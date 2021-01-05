<template>
  <div class="canvas-container">
    <canvas id="progress-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
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
              label: "Hours",
              borderColor: "#EFEFEF",
              data: [25, 10, 15, 26, 3, 15, 19],
              pointRadius: "5",
              pointHitRadius: "1",
            },
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