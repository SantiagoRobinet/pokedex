import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import PokemonDetail from './PokemonDetail';

jest.mock('../../redux/actions/pokemonActions');

describe('PokemonDetail test', () => {
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

  test('Should render loading when loading is true', () => {
    const initialState = {
      pokemonReducer: {
        loading: true,
      },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  test('Should render error message when there is an error loading the pokemon', () => {
    const initialState = {
      pokemonReducer: {
        error: 'ErrorCode',
      },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.error__msg').innerHTML)
      .toBe('There has been an error loading the pokemon');
  });

  test('Should render pokemon-detail', () => {
    const initialState = {
      pokemonReducer: {
        pokemonDetail: {
          id: 1,
          name: 'bulbasaur',
          types: [{ type: { name: 'grass' } }],
          sprites: { front_default: 'url', back_default: 'url' },
          stats: [{ stat: { name: 'name' } }],
        },
      },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.pokemon-detail')).toBeInTheDocument();
  });

  describe('UseEffect test', () => {
    test('Should dispatch loadPokemonById', () => {
      const initialState = {
        pokemonReducer: {
          pokemonDetail: {
            id: 1,
            name: 'bulbasaur',
            types: [{
              type: {
                name: 'grass',
              },
            }],
            sprites: { front_default: 'url', back_default: 'url' },
            stats: [{ stat: { name: 'name' } }],
          },
        },
      };

      wrapper = wrapperFactory(initialState);

      render(<PokemonDetail />, { wrapper });

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
