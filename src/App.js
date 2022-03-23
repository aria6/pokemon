import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import { PokemonList, PokemonDetail, MyPokemon } from './scenes';

import { POKEMON_GRAPHQL_URI } from './generals/constants';
import {
  MyPokemonContext,
  DEFAULT_VALUE,
} from './generals/context/myPokemonContext';

function App() {
  const client = new ApolloClient({
    uri: POKEMON_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });

  let localStoregeData = localStorage.getItem('myPokemon');
  let [myPokemon, setMyPokemon] = useState(
    localStoregeData ? JSON.parse(localStoregeData) : DEFAULT_VALUE.myPokemon
  );

  return (
    <MyPokemonContext.Provider
      value={{
        myPokemon,
        setMyPokemon: (newData) => {
          localStorage.setItem('myPokemon', JSON.stringify(newData));
          setMyPokemon(newData);
        },
      }}
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Container>
            <MobileView>
              <Routes>
                <Route path='/' element={<PokemonList />} />
                <Route path='pokemon_detail' element={<PokemonDetail />} />
                <Route path='my_pokemon' element={<MyPokemon />} />
              </Routes>
            </MobileView>
          </Container>
        </BrowserRouter>
      </ApolloProvider>
    </MyPokemonContext.Provider>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const MobileView = styled.div`
  max-width: 414px;
  width: 100%;
`;

export default App;
