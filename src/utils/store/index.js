import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentModelName: 'NOT_EXISTING_MODEL',
  showMenu: false,
  menuItems: [],
  models: [],
  matIdx: 0,
  objIdx: 0,
  objectUUID: '',
  objectID: 0,
  orderImages: [],
  progress: 0,
  showForm: false,
  loaded: false,
};

export const Context = createContext({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MODEL_NAME':
      return { ...state, currentModelName: action.payload };
    case 'SET_MENU_ITEMS':
      return { ...state, menuItems: action.payload };
    case 'TOGGLE_FORM':
      return { ...state, showForm: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, showMenu: action.payload };
    case 'SET_OBJ_IDX':
      return { ...state, objIdx: action.payload };
    case 'SET_MAT_IDX':
      return { ...state, matIdx: action.payload };
    case 'SET_OBJECT_UUID':
      return { ...state, objectUUID: action.payload };
    case 'SET_OBJECT_ID':
      return { ...state, objectID: action.payload };
    case 'SET_ORDER_IMAGES':
      return { ...state, orderImages: action.payload };
    case 'SET_MODELS':
      return { ...state, models: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_LOADED':
      return { ...state, loaded: action.payload };
    default:
      return { ...state };
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useStore = () => useContext(Context);
