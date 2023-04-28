export function spekerReducer(state, action) {
    switch (action.type) {
      case "SPEKERS_REQUEST":
        return { ...state, loading: true, error: "" };
      case "SPEKERS_SUCCESS":
        return {
          ...state,
          loading: false,
          spekers: action.payload,
          error: "",
        };
      case "SPEKERS_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export function createSpekerReducer(state, action) {
    switch (action.type) {
      case "SPEKERS_REQUEST":
        return { ...state, loading: true, error: "" };
      case "SPEKERS_SUCCESS":
        return {
          ...state,
          loading: false,
          spekers: action.payload,
          error: "",
        };
      case "SPEKERS_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }