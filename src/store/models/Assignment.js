import Model from "./base-model";
import Lesson from "./Lesson";

export default class Assignment extends Model {
  static entity = "assignments";

  static fields() {
    return {
      id: this.attr(null),
      lesson_id: this.attr(null),
      name: this.attr(""),
      question: this.attr(""),
      lesson: this.belongsTo(Lesson, "lesson_id")
    };
  }
}
