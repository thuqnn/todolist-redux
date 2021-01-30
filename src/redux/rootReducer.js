import { combineReducers } from "redux";
import { newTodoTask } from "./reducer/newTodoTask";
import { authReducer } from "./reducer/auth";
import { Todos } from "./reducer/Todo";

export default combineReducers({
  newTodoTask,
  auth: authReducer,
  todos: Todos,
});
