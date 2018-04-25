import { Database } from "@vuex-orm/core";
// MODELS
import Lesson from "./models/Lesson";
import Assignment from "./models/Assignment";
// MODULES
import lessons from "./modules/lessons";
import assignments from "./modules/assignments";

const database = new Database();

database.register(Lesson, lessons);
database.register(Assignment, assignments);

export default database;
