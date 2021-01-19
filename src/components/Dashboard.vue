<template>
  <loader :loading="loading"></loader>

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
    ></graph>
  </div>
  <div></div>
</template>

<script>
import Graph from "@/components/Graph.vue";
import Loader from "./UI/Loader.vue";

export default {
  data() {
    return {
      loading: false,
      todaysHours: null,
      weekHours: null,
      totalHours: null,
      // dailyGoal: 0,
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
  computed: {
    dailyGoal() {
      return this.$store.state.dashModule.dailyGoal;
    },
  },
  async created() {
    if (this.$store.state.authModule.isLoggedIn) {
      try {
        // this.loading = true;
        const userHours = await fetch("http://localhost:3000/get-hours", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const hourData = await userHours.json();
        // this.dailyGoal = hourData.dailyGoal;
        this.todaysHours = hourData.todaysHours;
        this.weekHours = hourData.weekHours;
        this.totalHours = hourData.totalHours;
        this.week = { ...hourData.week };
        const {
          dailyGoal,
          totalHours,
          todaysHours,
          weekHours,
          week,
        } = hourData;
        const progressUpdate = {
          dailyGoal: dailyGoal,
          totalHours: totalHours,
          todaysHours: todaysHours,
          weekHours: weekHours,
          week: week,
        };
        this.$store.commit("updateHours", progressUpdate);
        // console.log(hourData);
        // console.log(this.$store.state.dashModule);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    }
  },
  components: {
    Graph,
    Loader,
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