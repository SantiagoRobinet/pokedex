/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const axios = require('axios');

function pokemonController(pokemonModel) {
  function getPokemons(req, res) {
    const searchQuery = {};
    const selectQuery = {
      id: true,
      name: true,
      types: true,
      species: true,
      sprites: true,
    };

    pokemonModel.find(searchQuery, selectQuery, (findError, pokemonList) => (
      findError ? res.send(findError) : res.json(pokemonList.sort((a, b) => a.id - b.id))
    ));
  }

  async function getPokemonById({ params }, res) {
    if (!params) {
      res.send('Req params is required');
    } else {
      const { pokemonId } = params;

      const pokemonDetailEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

      try {
        const {
          data: {
            base_experience, forms, game_indices, held_items,
            is_default, location_area_encounters, order, species, ...data
          },
        } = await axios.get(pokemonDetailEndpoint);

        const { sprites: { back_default, front_default } } = data;

        const pokemonData = { ...data, sprites: { back_default, front_default } };

        res.json(pokemonData);
      } catch (pokemonDetailError) {
        res.send(pokemonDetailError);
      }
    }
  }

  async function getMovesTypes({ body }, res) {
    if (body) {
      const { moves } = body;
      let detailedMoves = [];
      let moveEndpoint = '';
      let loopIndex = 0;

      try {
        for (loopIndex; loopIndex < moves.length; loopIndex++) {
          const { move } = moves[loopIndex];
          moveEndpoint = move.url;
          const { data: { name, type } } = await axios.get(moveEndpoint);
          detailedMoves = [...detailedMoves, { name, type }];
        }
        res.json(detailedMoves);
      } catch (movesListError) {
        res.send(movesListError);
      }
    } else {
      res.send('Request body is required');
    }
  }

  return { getPokemons, getPokemonById, getMovesTypes };
}

module.exports = pokemonController;
