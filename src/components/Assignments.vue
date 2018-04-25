<template>
  <div class="container">
    <h2>
  Assignments
  </h2>
    <div class="assignment-input">
      <b-form-input type="text" v-model="assignment.name" placeholder="assignment name"/><br/>
      <b-form-input type="text" v-model="assignment.question" placeholder="assignment question"/><br/>
      <b-button @click="addAssignment()">ADD ASSIGNMENT</b-button>
    </div>
    <div v-for="a in assignments" :key="a.id"  class="assignment">
      <b-button size="sm" @click="removeAssignment(a)">DEL</b-button>
      {{a.name}} : <span class="assignment-question">{{a.question}}</span>
    </div>
  </div>
</template>

<script>
import Assignment from "../store/models/Assignment";
export default {
  name: "Assignments",
  props: ["lessonId"],
  components: {
    Assignment
  },
  computed: {
    assignments() {
      return (
        this.$store.getters["entities/lessons/query"]()
          .with("assignments")
          .find(this.lessonId).assignments || []
      );
    }
  },
  methods: {
    /**
     */
    addAssignment: function() {
      let { name, question } = this.assignment;
      let data = {
        lesson_id: this.lessonId,
        name,
        question
      };

      Assignment.create(data).then(_result => {
        this.assignment = { name: "", question: "" };
      });
      // this.$store
      //   .dispatch("entities/assignments/insert", { data })
      //   .then(_result => {
      //     this.assignment = { name: "", question: "" };
      //   });
    },
    removeAssignment(_assignment) {
      debugger;
      _assignment.deleteAndDestroy();
    }
  },
  data() {
    return {
      msg: "",
      assignment: {
        name: "",
        question: ""
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assignment-input {
  margin-bottom: 20px;
}
.assignment-entry {
  margin-bottom: 10px;
}
.assignment-question {
  font-style: italic;
}
</style>
