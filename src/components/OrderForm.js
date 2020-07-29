import styled from 'styled-components';
import { useStore } from '../utils/store';

const Container = styled.div`
  position: absolute;
  padding: 0.75rem;
  width: calc(100% - 1.5rem);
  height: calc(100% - 1.5rem);
  top: 0;
  left: 0;
  background-color: #fff;
  display: ${({ show }) => (show ? 'flex' : 'none')};
`;

const CloseBtn = styled.button`
  border: 0 none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.25rem;
  outline: none;
`;

const H3 = styled.h3`
  font-family: sans-serif;
  font-weight: 200;
`;
const P = styled.p`
  font-family: sans-serif;
  font-weight: 200;
`;
const Img = styled.img`
  width: 150px;
  display: block;
  float: left;
`;
const Form = styled.form`
  width: 50%;
  margin-left: 50%;
`;
const FormControl = styled.div`
  margin-bottom: 1.25rem;
`;
const Input = styled.input`
  padding: 0.75rem 0.5rem;
  width: 80%;
`;
const TextArea = styled.textarea`
  padding: 0.75rem 0.5rem;
  width: 80%;
`;
const SubmitBtn = styled.button`
  width: 80%;
  text-align: center;
  background-color: #3498db;
  border: 0 none;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #fff;
  outline: none;

  &:disabled {
    background-color: #1c608e;
    color: #dadada;
  }
`;

export default ({ show, data, images }) => {
  const { dispatch } = useStore();
  const htmlTimes = '&times;';

  const handleCloseOrderForm = () => {
    dispatch({ type: 'TOGGLE_FORM', payload: false });
  };

  return (
    <Container show={show}>
      <CloseBtn
        onClick={handleCloseOrderForm}
        dangerouslySetInnerHTML={{ __html: htmlTimes }}
      />

      <Form>
        <H3>Nezáväzná objednávka</H3>
        <FormControl>
          <Input type='text' id='name' placeholder='Zadajte svoje meno' />
        </FormControl>
        <FormControl>
          <Input type='text' id='surname' placeholder='Zadajte priezvisko' />
        </FormControl>
        <FormControl>
          <Input type='text' id='email' placeholder='Zadajte svoj e-mail' />
        </FormControl>
        <FormControl>
          <TextArea id='message' placeholder='Napíšte nám správu...' rows={3} />
        </FormControl>
        <H3>Objednaný produkt:</H3>
        {data ? <P>{`${data.vendor}: ${data.title}`}</P> : null}
        {images && images.length > 0
          ? images.map((item, i) => <Img src={item} key={`img-${i}`} />)
          : null}
        <SubmitBtn type='submit' disabled>
          Odoslať objednávku
        </SubmitBtn>
      </Form>
    </Container>
  );
};
