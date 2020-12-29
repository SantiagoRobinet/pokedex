import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../redux/configureStore';
import MoveList from './MoveList';

jest.mock('../../../redux/actions/pokemonActions');

describe('MoveList component test', () => {
  let wrapper = null;
  let store = null;

  const wrapperFactory = (wrapperInitialState) => {
    store = configureStore(wrapperInitialState);
    store.dispatch = jest.fn();

    return ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  test('Should render move list', () => {
    const initialState = { pokemonReducer: {} };
    wrapper = wrapperFactory(initialState);

    render(<MoveList />, { wrapper });

    expect(document.querySelector('.move-list')).toBeInTheDocument();
  });

  test('Should render loading container when moves are loading', () => {
    const initialState = { pokemonReducer: { loadingMoves: true } };
    wrapper = wrapperFactory(initialState);

    render(<MoveList />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });
});
