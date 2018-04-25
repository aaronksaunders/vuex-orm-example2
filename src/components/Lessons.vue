<template>
<div  class="main">
  <h2>
  Lessons
  </h2>
  <div class="lesson-input">
    <b-form-input type="text" v-model="lessonName"/>
      <b-button @click="addLesson()">ADD LESSON</b-button>
    </div>

      <b-table show-empty
             stacked="md"
             :items="lessons"
             :fields="fields"
    >
    <template slot="assignments" slot-scope="row">{{row.value.length}}</template>
          <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="viewDetails(row.item, row.index, $event.target)" class="mr-1">
          Details
        </b-button>
      </template>
      </b-table>
</div>
</template>

<script>
import Lesson from "../store/models/Lesson";

export default {
  name: "Lessons",
  data() {
    return {
      msg: "",
      lessonName: "",
      fields: ["id", "name", "assignments", "actions"]
    };
  },
  methods: {
    addLesson: function(_lesson) {
      let data = { name: this.lessonName };
      Lesson.create(data);
    },
    viewDetails(l) {
      this.$router.push("/assignments/" + l.id);
    }
  },
  created() {
    Lesson.fetch().then(_result => {
      console.log(_result);
    });
  },
  computed: {
    lessons() {
      return this.$store.getters["entities/lessons/query"]()
        .withAll()
        .get();
    },
    assignments() {
      return this.$store.getters["entities/assignments/query"]()
        .withAll()
        .get();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assignment {
  padding-left: 20px;
}
.main {
  padding: 10px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.lesson-input {
  margin-bottom: 20px;
}
.lesson-entry {
  margin-bottom: 10px;
}
.assignment-question {
  font-style: italic;
}
</style>
