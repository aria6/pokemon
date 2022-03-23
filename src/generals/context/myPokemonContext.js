import React from 'react';

const POKEMON_MOCK_DATA = [
  {
    id: '1',
    name: 'bulbasaur',
    nickname: 'Bulba',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    type: ['Grass', 'Fire'],
    weight: 300,
    abilities: ['Splash', 'Punch'],
    stats: [
      {
        name: 'hp',
        value: 99,
      },
      {
        name: 'attack',
        value: 100,
      },
    ],
  },
];

export const DEFAULT_VALUE = {
  myPokemon: [],
  setMyPokemon: () => {},
};

export const MyPokemonContext = React.createContext(DEFAULT_VALUE);
export const useMyPokemon = () => React.useContext(MyPokemonContext);
