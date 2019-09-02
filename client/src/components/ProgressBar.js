import React, { useRef } from 'react';
import styled from 'styled-components';

// STYLES
const Outer = styled.div`
  width: 100%;
  border: 1px solid #3d3d3d;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
`;

const Inner = styled.div.attrs(props => ({
  style: { width: `${props.progress}%` },
}))`
  height: 10px;
  background-color: #3d3d3d;
  width: 0%;
`;

// COMPONENT
const ProgressBar = ({ progress, setSeek }) => {
  const progressRef = useRef(null);

  const handleClick = (ev) => {
    const width = progressRef.current.clientWidth;
    const clickX = ev.clientX - progressRef.current.offsetLeft;
    const newSeek = (clickX / width) * 100;

    setSeek(newSeek);
  };

  return (
    <Outer onClick={ev => handleClick(ev)} ref={progressRef}>
      <Inner progress={progress} />
    </Outer>
  );
};

export default ProgressBar;