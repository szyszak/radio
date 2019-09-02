const tracksDataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { tracksData: action.payload };

    case 'SET_HOWL': {
      if (!state.tracksData[action.payload.index].howl) {
        const newState = state.tracksData.map((item, idx) => {
          if (idx === action.payload.index) {
            return action.payload;
          }
          return item;
        });

        return { ...state, tracksData: newState };
      }

      return state;
    }

    default:
      return state;
  }
};

export default tracksDataReducer;
