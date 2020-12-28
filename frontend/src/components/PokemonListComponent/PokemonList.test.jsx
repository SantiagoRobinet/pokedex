import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { filterPokemonByName, fillDisplayPokemonList } from '../../redux/actions/pokemonActions';
import configureStore from '../../redux/configureStore';
import PokemonList from './PokemonList';

jest.mock('../../redux/actions/pokemonActions');

describe('PokemonList Component tests', () => {
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

  test('Should render title__container', () => {
    const initialState = { pokemonReducer: {} };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.title__container')).toBeInTheDocument();
  });

  test('Should render load__error', () => {
    const initialState = { pokemonReducer: { error: true } };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.load__error')).toBeInTheDocument();
  });

  test('Should render loading-container when loading is true', () => {
    const initialState = { pokemonReducer: { loading: true } };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  test('Should render pokemon-list when loading is false and there is a pokemon list', () => {
    const initialState = { pokemonReducer: { pokemonList: [{ id: 1, name: 'charmander' }] } };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.pokemon-list')).toBeInTheDocument();
  });

  test('Should render pokemon-list with items when having a displayPokemonList', () => {
    const initialState = {
      pokemonReducer:
       {
         pokemonList: [{ id: 1, name: 'charmander' }],
         displayPokemonList: [
           {
             id: 1,
             name: 'charmander',
             types: [{ type: { name: 'fire' } }],
             sprites: { front_default: 'url' },
           },
         ],
       },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.pokemon__name').innerHTML).toBe('charmander');
  });

  test('Should exexcute handleChange and call filterPokemonByName when searching with 3 or more characters', () => {
    const initialState = {
      pokemonReducer:
       {
         pokemonList: [{ id: 1, name: 'charmander' }],
         displayPokemonList: [
           {
             id: 1,
             name: 'charmander',
             types: [{ type: { name: 'fire' } }],
             sprites: { front_default: 'url' },
           },
         ],
       },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const searchInput = document.querySelector('.screen__input');

    fireEvent.change(searchInput, { target: { value: 'random' } });

    expect(filterPokemonByName).toHaveBeenCalled();
  });

  test('Should exexcute handleChange and call fillDisplayPokemonList when searching with less than 3 characters', () => {
    const initialState = {
      pokemonReducer:
       {
         pokemonList: [{ id: 1, name: 'charmander' }],
         displayPokemonList: [
           {
             id: 1,
             name: 'charmander',
             types: [{ type: { name: 'fire' } }],
             sprites: { front_default: 'url' },
           },
         ],
       },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const searchInput = document.querySelector('.screen__input');

    fireEvent.change(searchInput, { target: { value: 'as' } });

    expect(fillDisplayPokemonList).toHaveBeenCalled();
  });

  test('Should exexcute handleClick and call fillDisplayPokemonList when clicking a pokemon card', () => {
    const initialState = {
      pokemonReducer:
       {
         pokemonList: [{ id: 1, name: 'charmander' }],
         displayPokemonList: [
           {
             id: 1,
             name: 'charmander',
             types: [{ type: { name: 'fire' } }],
             sprites: { front_default: 'url' },
           },
         ],
       },
    };

    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const linkElement = document.querySelector('.link');

    fireEvent.click(linkElement);

    expect(fillDisplayPokemonList).toHaveBeenCalled();
  });
});
