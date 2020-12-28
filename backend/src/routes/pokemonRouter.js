const { Router } = require('express');
const pokemonControllerRaw = require('../controllers/pokemonController');

function pokemonRouter(pokemonModel) {
  const router = Router();
  const pokemonController = pokemonControllerRaw(pokemonModel);

  router.route('/').get(pokemonController.getPokemons);

  router.route('/details/:pokemonId').get(pokemonController.getPokemonById);

  router.route('/moves').post(pokemonController.getMovesTypes);

  return router;
}

module.exports = pokemonRouter;
