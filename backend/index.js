const express = require('express');
const { urlencoded, json } = require('body-parser');
const debug = require('debug')('app');
const { connect } = require('mongoose');
const cors = require('cors');

const pokemonModel = require('./src/models/pokemonModel');
const pokemonRouter = require('./src/routes/pokemonRouter')(pokemonModel);

const app = express();
const port = process.env.PORT || 2804;
const bodyConfig = { limit: '10mb', extended: true };

connect('mongodb+srv://admin:admin@admira-pokecluster.yxysw.mongodb.net/pokedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(urlencoded(bodyConfig));
app.use(json(bodyConfig));

app.use('/api/pokemons', pokemonRouter);

app.listen(port, () => {
  debug(`Server is running in port: ${port}`);
});
