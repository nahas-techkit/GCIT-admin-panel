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

  export function createEventReducer(state, action) {
    switch (action.type) {
      case "EVENT_REQUEST":
        return { ...state, evtLoading: true, error: "" };
      case "EVENT_SUCCESS":
        return {
          ...state,
          evtLoading: false,
          event: action.payload,
          error: "",
        };
      case "EVENT_ERROR":
        return { ...state, evtLoading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export function getEventsReducer(state, action) {
    switch (action.type) {
      case "EVENT_REQUEST":
        return { ...state, loading: true, error: "" };
      case "EVENT_SUCCESS":
        return {
          ...state,
          loading: false,
          events: action.payload,
          error: "",
        };
      case "EVENT_ERROR":
        return { ...state, loading: false, error: action.payload };


        case "EVENT_DELETE":
          return {
            ...state,
            loading: false,
            events: action.payload,
            error: "",
          };
  
      default:
        return state;
    }
  }

  export function getEventByIdReducer(state, action) {
    switch (action.type) {
      case "EVENT_REQUEST":
        return { ...state, loading: true, error: "" };
      case "EVENT_SUCCESS":
        return {
          ...state,
          loading: false,
          event: action.payload,
          error: "",
        };
      case "EVENT_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

