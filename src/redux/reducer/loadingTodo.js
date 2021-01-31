export const loadingTodos = (
  state = { loading: true, error: false, loadingCount: 0 },
  action
) => {
  switch (action.type) {
    case "LOADING_TODO": {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case "LOADING_ERROR": {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case "LOADING_COUNT": {
      return {
        ...state,
        loadingCount: action.payload.loadingCount,
      };
    }
    default:
      return state;
  }
};
//phân tích action và xử lý, sau đó return ra state mới
