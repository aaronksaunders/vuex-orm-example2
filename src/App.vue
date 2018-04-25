<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Lessons from "./components/Lessons";
import Assignments from "./components/Assignments";

// STORE
import store from "./store";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Lessons },
  { path: "/assignments/:lessonId", component: Assignments, props: true }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});

export default {
  name: "App",
  store,
  router,
  components: {
    Lessons,
    Assignments
  },
  created() {
    // Here we are stubbing the initial data. In the real world, this
    // should be the response from the API Backend.

    // id: this.attr(null),
    // lesson_id: this.attr(null),
    // name: this.attr(""),
    // question: this.attr(""),
    // assignee: this.belongsTo(Lesson, "lesson_id")

    const initialData = [
      {
        id: "assignment-1",
        lesson_id: "lesson-1",
        name: "Assignment One",
        question: "What am I doing here...",
        lesson: {
          id: "lesson-1",
          name: "Lesson One"
        }
      },
      {
        id: "assignment-2",
        lesson_id: "lesson-1",
        name: "Assignment Two",
        question: "What am I doing here...Again",
        lesson: {
          id: "lesson-1",
          name: "Lesson One"
        }
      }
    ];
    this.$store.dispatch("entities/assignments/create", { data: [] });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
