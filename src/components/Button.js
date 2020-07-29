import styled from 'styled-components';
import { useStore } from '../utils/store';

const BtnWrapper = styled.button`
  border: 3px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  width: 5vw;
  height: 5vw;
  min-width: 40px;
  min-height: 40px;
  color: #fff;
  ${({ left }) => (left ? 'left: 10px;' : 'right: 10px;')}
  top: 45%;
  outline: none;
`;

export default ({ direction = 'left' }) => {
  const { state, dispatch } = useStore();

  const handleObject = () => {
    const { objIdx, models } = state;

    if (direction === 'left' && objIdx > 0) {
      dispatch({ type: 'SET_OBJ_IDX', payload: objIdx - 1 });
    }
    if (direction !== 'left' && objIdx < models.length - 1) {
      dispatch({ type: 'SET_OBJ_IDX', payload: objIdx + 1 });
    }
  };

  return (
    <BtnWrapper
      left={direction === 'left'}
      onClick={handleObject}
      dangerouslySetInnerHTML={{
        __html: direction === 'left' ? '&#8249;' : '&#8250;',
      }}
    />
  );
};
