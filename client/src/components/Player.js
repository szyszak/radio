import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatTime } from '../util';
import ProgressBar from './ProgressBar';
import TimeDisplay from './TimeDisplay';
import Background from './Background';
import playIcon from '../assets/play.png';
import pauseIcon from '../assets/pause.png';
import nextIcon from '../assets/next.png';
import prevIcon from '../assets/prev.png';

// STYLES
const Wrapper = styled.div`
  max-width: 560px;
  width: 100%;
  padding: 30px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Cover = styled.img`
  width: 100%;
  height: auto;
`;

const ArtistName = styled.p`
  margin-top: 8px;
  font-size: 2rem;
`;

const SongName = styled.p`
  margin-bottom: 16px;
  font-size: 2rem;
`;

const Controls = styled.div``;

const ControlBtn = styled.button`
  margin: 20px;
  border: none;
  background: none;
  cursor: pointer;

  @media (max-width: 400px) {
    margin: 20px 10px;
  }
`;

const Icon = styled.img`
  display: block;
  width: 70px;
  height: auto;

  @media (max-width: 400px) {
    width: 60px;
  }
`;

const License = styled.p`
  font-size: 1.4rem;
`;

const LicenseLink = styled.a`
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;

// COMPONENT
const Player = ({ trackData, setCurrentTrack }) => {
  // STATE
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const loopID = useRef();

  // FUNCTIONS
  const updateLoop = () => {
    // gotta do this check due to a bug in Howler library
    if (typeof trackData.howl.seek() === 'number') {
      const newProgress = trackData.howl.seek() / trackData.duration;
      setProgress(newProgress);

      if (formatTime(trackData.howl.seek()) !== currentTime) {
        setCurrentTime(formatTime(trackData.howl.seek()));
      }
    }

    loopID.current = requestAnimationFrame(updateLoop);
  };

  const skip = (direction) => {
    if (!autoPlay) {
      setAutoPlay(true);
    }

    trackData.howl.stop();
    setIsPlaying(false);
    cancelAnimationFrame(loopID.current);
    setProgress(0);
    setCurrentTime('00:00');
    setCurrentTrack(direction);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(!isPlaying);
      trackData.howl.play();
      updateLoop();
      // eslint-disable-next-line no-underscore-dangle
      if (trackData.howl._onend.length === 0) {
        trackData.howl.on('end', () => skip('NEXT_TRACK'));
      }
    } else {
      setIsPlaying(!isPlaying);
      trackData.howl.pause();
      cancelAnimationFrame(loopID.current);
    }
  };

  const setSeek = (percent) => {
    trackData.howl.seek((percent / 100) * trackData.duration);
    setProgress(percent);
    setCurrentTime(formatTime(trackData.howl.seek()));
  };

  // LIFECYCLE
  useEffect(() => {
    if (trackData) {
      setDuration(formatTime(trackData.duration));
    }

    if (trackData && trackData.howl && autoPlay) {
      togglePlay();
    }
    // edge case where I can ignore this rule it seems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackData]);

  // RENDER
  return (
    <Wrapper>
      <Background isPlaying={isPlaying} />

      {trackData === undefined || !trackData.howl ? (
        <h2>loading...</h2>
      ) : (
        <>
          <Cover src={trackData.cover} alt="" />

          <ArtistName>{trackData.artist}</ArtistName>

          <SongName>{trackData.song}</SongName>

          <ProgressBar progress={progress} setSeek={setSeek} />

          <TimeDisplay currentTime={currentTime} duration={duration} />

          <Controls>
            <ControlBtn type="button" onClick={() => skip('PREV_TRACK')}>
              <Icon src={prevIcon} alt="prev" />
            </ControlBtn>

            <ControlBtn type="button" onClick={() => togglePlay()}>
              <Icon src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? 'pause' : 'play'} />
            </ControlBtn>

            <ControlBtn type="button" onClick={() => skip('NEXT_TRACK')}>
              <Icon src={nextIcon} alt="next" />
            </ControlBtn>
          </Controls>

          <License>
            All music, art and icons supplied by{' '}
            <LicenseLink href="https://icons8.com/" target="_blank" rel="noopener noreferrer">
              Icons8
            </LicenseLink>
          </License>
        </>
      )}
    </Wrapper>
  );
};

Player.propTypes = {
  trackData: PropTypes.shape({
    URL: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    howl: PropTypes.object,
    index: PropTypes.number.isRequired,
    song: PropTypes.string.isRequired,
  }),
  setCurrentTrack: PropTypes.func.isRequired,
};

export default Player;
