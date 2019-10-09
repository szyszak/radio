import styled from 'styled-components';
import background from '../assets/background.jpg';

// STYLED COMPONENT
const Background = styled.img.attrs(props => ({
  src: background,
  alt: '',
  style: { animationPlayState: `${props.isPlaying ? 'running' : 'paused'}` },
}))`
  z-index: -1;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  animation-name: rotateColor;
  animation-play-state: paused;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes rotateColor {
    0% {
      filter: hue-rotate(0deg);
    }

    50% {
      filter: hue-rotate(360deg);
    }

    100% {
      filter: hue-rotate(0deg);
    }
  }
`;

export default Background;
