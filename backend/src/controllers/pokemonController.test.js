const axios = require('axios');
const PokemonModel = require('../models/pokemonModel');
const pokemonController = require('./pokemonController')(PokemonModel);

jest.mock('axios');

describe('Given pokemonController function', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const req = {};

  afterEach(() => {
    axios.get.mockClear();
  });

  describe('Given getPokemons function', () => {
    describe('When it`s succesfuly called', () => {
      test('Then it should call res.json with a pokemonList', () => {
        const pokemonList = [{ name: 'bulbasour', id: 2 }, { name: 'charmander', id: 1 }, { name: 'squartle', id: 3 }];

        PokemonModel.find = jest.fn().mockImplementationOnce(
          (searchQuery, selectQuery, callback) => {
            callback(false, pokemonList);
          },
        );

        pokemonController.getPokemons(req, res);

        expect(res.json).toHaveBeenCalledWith(pokemonList);
      });
    });

    describe('When find function throws an error', () => {
      test('Then it should call res.send with an error message', () => {
        PokemonModel.find = jest.fn().mockImplementationOnce(
          (searchQuery, selectQuery, callback) => {
            callback('Something went wrong', false);
          },
        );

        pokemonController.getPokemons(req, res);

        expect(res.send).toHaveBeenCalledWith('Something went wrong');
      });
    });
  });
});
