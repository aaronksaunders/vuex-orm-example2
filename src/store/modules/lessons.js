import * as api from "../firebase-service";
export default {
  namespaced: true,
  mutations: {},
  actions: {
    fetch(context, record) {
      // debugger;
      var savedLessons,
        promises = [];

      // get all of the lessons...
      return api
        .getAll("lesson")
        .then(_results => {
          savedLessons = _results;

          // get all of the assignments for the lessons
          for (var r in savedLessons) {
            promises.push(
              api.getAllWithQuery("assignment", [
                "lesson_id",
                "==",
                savedLessons[r].id
              ])
            );
          }
          return Promise.all(promises);
        })
        .then(_assignments => {
          // map the assignments to the lessons
          for (var i in _assignments) {
            savedLessons[i].assignments = _assignments[i];
          }
          return context.dispatch("create", { data: savedLessons });
        });
    }
  }
  // actions: {
  //   beforeCreate(context, record) {
  //     console.log("in before create", record);

  //     let id = api.getObjectId("lesson");
  //     console.log(id);
  //     let r = {
  //       ...record,
  //       id,
  //       $id: id,
  //       published: true
  //     };
  //     console.log(r);
  //     return r;
  //   }
  // }
};
