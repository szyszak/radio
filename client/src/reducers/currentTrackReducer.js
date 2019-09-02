const currentTrackReducer = (state, action) => {
  switch (action) {
    case 'NEXT_TRACK':
      if (state.currentTrack === 4) {
        return { currentTrack: 0 };
      }
      return { currentTrack: state.currentTrack + 1 };

    case 'PREV_TRACK':
      if (state.currentTrack === 0) {
        return { currentTrack: 4 };
      }
      return { currentTrack: state.currentTrack - 1 };

    default:
      return state;
  }
};

export default currentTrackReducer;
