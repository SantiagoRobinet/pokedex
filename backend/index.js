const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const { connect } = require('mongoose');
const cors = require('cors');

const pokemonRouter = require('./src/routes/pokemonRouter');

const app = express();
const port = process.env.PORT || 2804;

connect('mongodb+srv://admin:admin@admira-pokecluster.yxysw.mongodb.net/pokedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use('/api/pokemons', pokemonRouter);

app.listen(port, () => {
  debug(`Server is running in port: ${port}`);
});
