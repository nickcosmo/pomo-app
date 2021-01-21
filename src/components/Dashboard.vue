<template>
  <div class="container">
    <div class="data">
      <h1>Dashboard</h1>
      <p>Today's Hours: {{ todaysHours }}</p>
      <p>This Weeks Hours: {{ weekHours }}</p>
      <p>All Time Hours: {{ totalHours }}</p>
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
        const userHours = await fetch("http://localhost:3000/get-hours", {
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
  font-size: 60px;
}

p {
  font-size: 30px;
}

.data {
  text-align: left;
  padding-left: 40px;
}

.container {
  display: inline-block;
  width: 800px;
}
</style>