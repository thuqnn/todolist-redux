export const newTodoTask = (state = { inputValue: "" }, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return {
        ...state,
        inputValue: action.payload.newTask,
      };
    }
    default:
      return state;
  }
};
