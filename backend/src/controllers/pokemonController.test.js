const axios = require('axios');
const PokemonModel = require('../models/pokemonModel');
const pokemonController = require('./pokemonController')(PokemonModel);

jest.mock('axios');

describe('Given pokemonController function', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  let req = {};

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('Given getPokemonById function', () => {
    describe('When the request doesn`t contain params', () => {
      test('Then it should call res.send with `Req params is required`', async () => {
        await pokemonController.getPokemonById(req, res);

        expect(res.send).toHaveBeenCalledWith('Req params is required');
      });
    });

    describe('When the request contain params', () => {
      test('Then it should call res.send with `Req params is required`', async () => {
        req = { params: { pokemonId: 'a25s36d52ff645g55' } };

        const pokeMock = {
          data: {
            base_experience: 1,
            forms: [],
            game_indices: [],
            held_items: [],
            is_default: 1,
            location_area_encounters: [],
            order: 1,
            species: [],
            sprites: {
              back_default: 'asd',
              front_default: 'asd',
            },
            randomProps: 'value',
          },
        };
        const expectValue = {
          sprites: {
            back_default: 'asd',
            front_default: 'asd',
          },
          randomProps: 'value',
        };

        axios.get.mockReturnValueOnce(Promise.resolve(pokeMock));

        await pokemonController.getPokemonById(req, res);

        expect(res.json).toHaveBeenCalledWith(expectValue);
      });
    });

    describe('When the request contain params but axios.get throws an error', () => {
      test('Then it should call res.send with that error', async () => {
        axios.get.mockReturnValueOnce(Promise.reject(Error('Server is down')));

        await pokemonController.getPokemonById(req, res);

        expect(res.send.mock.calls[0][0].message).toBe('Server is down');
      });
    });
  });

  describe('Given getMovesTypes function', () => {
    describe('When request body doesn`t contain moves', () => {
      test('Then it should call res.send with `Request body is required`', async () => {
        await pokemonController.getMovesTypes(req, res);

        expect(res.send).toHaveBeenCalledWith('Request body is required');
      });
    });

    describe('When the request body has moves but the axios throws an error', () => {
      test('Then it should call res.send with that error', async () => {
        req = { body: { moves: [{ move: { url: 'url' } }] } };

        axios.get.mockReturnValueOnce(Promise.reject(new Error('An Error has ocurred')));

        await pokemonController.getMovesTypes(req, res);

        expect(res.send.mock.calls[0][0].message).toBe('An Error has ocurred');
      });
    });

    describe('When the request body has moves', () => {
      test('Then it should call res.json with moves list', async () => {
        req = { body: { moves: [{ move: { url: 'url' } }] } };

        const moveMock = { data: { name: 'grow', type: 'grass' } };
        axios.get.mockReturnValueOnce(Promise.resolve(moveMock));

        await pokemonController.getMovesTypes(req, res);
        const expectValue = [moveMock.data];

        expect(res.json).toHaveBeenCalledWith(expectValue);
      });
    });
    describe('When the request body has moves but the axios throws an error', () => {
      test('Then it should call res.send with that error', async () => {
        req = { body: { moves: [{ move: { url: 'url' } }] } };

        axios.get.mockReturnValueOnce(Promise.reject(new Error('An Error has ocurred')));

        await pokemonController.getMovesTypes(req, res);

        expect(res.send.mock.calls[0][0].message).toBe('An Error has ocurred');
      });
    });
  });
});
