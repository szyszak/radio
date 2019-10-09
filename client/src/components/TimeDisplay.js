import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

// PROP TYPES
TimeDisplay.propTypes = {
  currentTime: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default TimeDisplay;
