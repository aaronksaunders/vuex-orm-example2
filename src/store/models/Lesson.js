import Model from "./base-model";
import Assignment from "./Assignment";

export default class Lesson extends Model {
  static entity = "lessons";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(""),
      assignments: this.hasMany(Assignment, "lesson_id")
    };
  }
}
