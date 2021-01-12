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
    ></graph>
  </div>
  <div></div>
</template>

<script>
import Graph from "@/components/Graph.vue";

export default {
  data() {
    return {
      todaysHours: null,
      weekHours: null,
      totalHours: null,
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
  async created() {
    const userHours = await fetch("http://localhost:3000/get-hours", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const hourData = await userHours.json();
    this.$store.commit("updateHours", hourData);
    this.dailyGoal = hourData.dailyGoal;
    this.todaysHours = hourData.todaysHours;
    this.weekHours = hourData.weekHours;
    this.totalHours = hourData.totalHours;
    this.week = { ...hourData.week };
    // console.log(hourData);
    // console.log(this.$store.state.dashModule);
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