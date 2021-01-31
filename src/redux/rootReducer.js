import { combineReducers } from "redux";
import { newTodoTask } from "./reducer/newTodoTask";
import { authReducer } from "./reducer/auth";
import { Todos } from "./reducer/Todo";
import { loadingTodos } from "./reducer/loadingTodo";

export default combineReducers({
  newTodoTask,
  auth: authReducer,
  todos: Todos,
  loadings: loadingTodos,
});
