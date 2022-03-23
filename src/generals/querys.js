import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
      count
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          name
        }
        is_hidden
      }
      moves {
        move {
          name
        }
      }
      weight
      status
      stats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;
