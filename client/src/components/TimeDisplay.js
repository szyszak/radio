import React from 'react';
import styled from 'styled-components';

// STYLES
const Wrapper = styled.div`
  text-align: left;
  font-size: 1.8rem;
`;

// COMPONENT
const TimeDisplay = ({ currentTime, duration }) => (
  <Wrapper>
    {currentTime}/{duration}
  </Wrapper>
);

export default TimeDisplay;
