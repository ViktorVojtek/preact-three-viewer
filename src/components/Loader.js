import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  background-color: transparent;
  border-radius: 50%;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
`;

const Circle = styled.circle`
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: #000;
  stroke-width: 4;
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ offset }) => offset};
`;

const useRadians = (progress, ref) => {
  const [radians, setRadians] = useState([0, 250]);

  useEffect(() => {
    const radius = ref.current.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    setRadians([circumference, offset]);
  }, [progress]);

  return radians;
};

export default ({ progress, show }) => {
  const circleRef = useRef(null);
  const radians = useRadians(progress, circleRef);

  return (
    <LoaderWrapper show={show}>
      <svg width='100' height='100'>
        <Circle
          ref={circleRef}
          fill='transparent'
          r='40'
          cx='50'
          cy='50'
          circumference={radians[0]}
          offset={radians[1]}
        />
      </svg>
    </LoaderWrapper>
  );
};
