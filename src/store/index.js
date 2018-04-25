import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import database from "./database";
import firebasePlugin from "./firebasePlugin";

Vue.use(Vuex);
VuexORM.use(firebasePlugin);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
});

export default store;
