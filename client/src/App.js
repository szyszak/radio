import React, { useReducer, useEffect } from 'react';
import tracksDataReducer from './reducers/tracksDataReducer';
import currentTrackReducer from './reducers/currentTrackReducer';
import { addHowl } from './util';

import Player from './components/Player';

const App = () => {
  // STATE
  const [{ tracksData }, setTracksData] = useReducer(tracksDataReducer, { tracksData: [] });
  const [{ currentTrack }, setCurrentTrack] = useReducer(currentTrackReducer, { currentTrack: 0 });

  // FETCH TRACKS DATA
  useEffect(() => {
    const fetchTracksData = async () => {
      const result = await fetch('/tracks').then(data => data.json());

      setTracksData({ type: 'SET_DATA', payload: result });
    };

    fetchTracksData();
  }, []);

  // ADD HOWL TO CURRENT TRACK IF NOT PRESENT
  useEffect(() => {
    if (tracksData.length > 0 && !tracksData[currentTrack].howl) {
      const obj = addHowl(tracksData[currentTrack]);
      setTracksData({ type: 'SET_HOWL', payload: obj });
    }
  }, [tracksData, currentTrack]);

  // COMPONENT
  return (
    <div className="App">
      <Player
        trackData={tracksData[currentTrack]}
        setCurrentTrack={setCurrentTrack}
        setTracksData={setTracksData}
      />
    </div>
  );
};

export default App;
