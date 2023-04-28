export function galleryReducer(state, action) {
    switch (action.type) {
      case "GALLERY_REQUEST":
        return { ...state, loading: true, error: "" };
      case "GALLERY_SUCCESS":
        return {
          ...state,
          loading: false,
          gallery: action.payload,
          error: "",
        };
      case "GALLERY_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }