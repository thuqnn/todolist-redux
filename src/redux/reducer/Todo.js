import { actionTypes } from "../actionTypes";

export const Todos = (state = { todoList: [] }, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TODO_LIST: {
      return {
        ...state,
        todoList: action.payload.newTodolist,
      };
    }
    default:
      return state;
  }
};
