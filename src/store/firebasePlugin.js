const plugin = {
  // `components` contains Vuex ORM objects such as Model and Query.
  // The plugin author can then extend those objects to add
  // whatever features it needs.
  install(components, options) {
    // Add global (static) method or property.
    components.Model.globalMethod = function() {
      // Logic...
    };

    // Add an instance method or property.
    components.Query.prototype.instanceMethod = function() {
      // Logic...
      console.log("in query");
    };
  }
};

export default plugin;
