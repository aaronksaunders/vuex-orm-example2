import * as api from "../firebase-service";
export default {
  namespaced: true,
  actions: {
    fetch(context, record) {
      // get all of the lessons...
      return api.getAll("assignment").then(_assignments => {
        return context.dispatch("create", { data: _assignments });
      });
    },
    destroy(context, record) {
      debugger;
      return api.destroyObject("assignment", record.id);
    }
  }
};
