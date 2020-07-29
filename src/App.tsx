import * as React from 'react';
import { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useStore } from './utils/store';
import { useModels, handleScreenshots } from './utils';
import initScene from './init';
import Menu from './components/Menu';
import Button from './components/Button';
import Loader from './components/Loader';
import Title from './components/Title';
import OrderForm from './components/OrderForm';

const AppWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const OrderFormBtn = styled.button`
  padding: 0.75rem 1rem;
  background-color: #000;
  border: 0 none;
  border-radius: 0.25rem;
  color: #fff;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  outline: none;
`;

export default function (): JSX.Element {
  const { state, dispatch } = useStore();
  const {
    menuItems,
    objIdx,
    showMenu,
    showForm,
    models,
    progress,
    orderImages,
    loaded,
  } = state;

  useEffect(() => {
    initScene();
  }, []);
  useModels(models, objIdx);

  const handleToggleForm: () => void = () => {
    dispatch({ type: 'TOGGLE_FORM', payload: true });
    handleScreenshots();
  };

  return (
    <AppWrapper id='App'>
      {loaded ? (
        <Fragment>
          <Title title={`${models[objIdx].vendor}: ${models[objIdx].title}`} />
          {objIdx > 0 && <Button />}
          {objIdx < models.length - 1 && <Button direction='right' />}
          <OrderFormBtn onClick={handleToggleForm}>Objednávka</OrderFormBtn>
          <OrderForm
            show={showForm}
            data={models[objIdx]}
            images={orderImages}
          />
        </Fragment>
      ) : null}
      <Loader show={progress < 100 && !loaded} progress={progress} />
      <Menu show={showMenu} items={menuItems} />
    </AppWrapper>
  );
}
