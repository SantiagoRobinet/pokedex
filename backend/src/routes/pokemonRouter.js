const { Router } = require('express');
const pokemonControllerRaw = require('../controllers/pokemonController');

function pokemonRouter(PokemonModel) {
  const router = Router();
  const pokemonController = pokemonControllerRaw(PokemonModel);

  router.route('/').get(pokemonController.getPokemons);

  router.route('/details/:pokemonId').get(pokemonController.getPokemonById);

  router.route('/moves').post(pokemonController.getMovesTypes);

  return router;
}

module.exports = pokemonRouter;
