import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

interface ILoaderWrapperProps {
  show: boolean;
}
const LoaderWrapper = styled.div`
  background-color: transparent;
  border-radius: 50%;
  display: ${({ show }: ILoaderWrapperProps) => (show ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
`;

interface ICircleProps {
  circumference: number;
}
const Circle = styled.circle`
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: #000;
  stroke-width: 4;
  stroke-dasharray: ${({ circumference }: ICircleProps) => circumference};
  stroke-dashoffset: ${({ offset }) => offset};
`;

const useRadians: (
  progress: number,
  ref: React.MutableRefObject<any>
) => number[] = (progress, ref) => {
  const [radians, setRadians] = useState([0, 250]);

  useEffect(() => {
    const radius = ref.current.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    setRadians([circumference, offset]);
  }, [progress]);

  return radians;
};

export default function ({
  progress,
  show,
}: {
  progress: number;
  show: boolean;
}): JSX.Element {
  const circleRef: React.MutableRefObject<any> = useRef(null);
  const radians: number[] = useRadians(progress, circleRef);

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
}
