import styled from 'styled-components';

const H4 = styled.h4`
  font-family: sans-serif;
  color: #000;
  font-weight: 700;
  padding-left: 1rem;
  position: absolute;
`;

export default ({ title }) => <H4>{title}</H4>;
