<template>
  <div class="container">
    <div class="data">
      <h1>Dashboard</h1>
      <p>Today: {{ todaysHours }} hrs</p>
      <p>This Week: {{ weekHours }} hrs</p>
      <p>All Time: {{ totalHours }} hrs</p>
    </div>
    <graph
      :monday="week.monday"
      :tuesday="week.tuesday"
      :wednesday="week.wednesday"
      :thursday="week.thursday"
      :friday="week.friday"
      :saturday="week.saturday"
      :sunday="week.sunday"
      :goal="dailyGoal"
      @id="getId"
    ></graph>
  </div>
</template>

<script>
import Graph from "@/components/Graph.vue";

export default {
  props: ["isLoggedIn"],
  data() {
    return {
      graphId: null,
      todaysHours: 0,
      weekHours: 0,
      totalHours: 0,
      dailyGoal: 0,
      week: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    };
  },
  methods: {
    getId(id) {
      this.graphId = id;
    },
  },
  async created() {
    if (this.isLoggedIn) {
      try {
        // this.$store.commit("load");
        const userHours = await fetch(`${process.env.VUE_APP_API}/get-hours`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // this.$store.commit("load");

        const hourData = await userHours.json();
        this.todaysHours = hourData.todaysHours;
        this.weekHours = hourData.weekHours;
        this.totalHours = hourData.totalHours;
        this.week = { ...hourData.week };
        this.dailyGoal = hourData.dailyGoal;

        const goal = [
          this.dailyGoal,
          this.dailyGoal,
          this.dailyGoal,
          this.dailyGoal,
          this.dailyGoal,
          this.dailyGoal,
          this.dailyGoal,
        ];

        const dailyData = [
          this.week.monday,
          this.week.tuesday,
          this.week.wednesday,
          this.week.thursday,
          this.week.friday,
          this.week.saturday,
          this.week.sunday,
        ];

        const updateGraph = function (chart) {
          chart.data.datasets[0].data = goal;
          chart.data.datasets[1].data = dailyData;
          chart.update();
        };
        updateGraph(this.graphId);
      } catch (err) {
        this.$store.commit("updateModalType", "error");
        this.$store.commit("updateModalMessage", err.message);
        this.$store.commit("updateModalStatus");
      }
    }
  },
  components: {
    Graph,
  },
};
</script>

<style scoped>
h1 {
  font-size: 6em;
}

p {
  font-size: 3em;
}

.data {
  text-align: left;
}

.container {
  display: inline-block;
  margin: auto;
  width: 30%;
}

@media screen and (max-width: 1555px) {
  .container {
    width: 35%;
  }
  h1 {
    font-size: 5em;
  }
}

@media screen and (max-width: 1100px) {
  .container {
    width: 50%;
  }
}

@media screen and (max-width: 950px) {
  .container {
    width: 60%;
  }
}

@media screen and (max-width: 775px) {
  .container {
    width: 80%;
  }
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 40px;
  }
  p {
    font-size: 25px;
  }
}

@media screen and (max-width: 380px) {
  h1 {
    font-size: 32.5px;
  }
  p {
    font-size: 20px;
  }
}
</style>