/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/HeaderComponent/Header';
import PokemonList from './components/PokemonListComponent/PokemonList';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={PokemonList} />
      </Switch>
    </>

  );
}

export default App;
