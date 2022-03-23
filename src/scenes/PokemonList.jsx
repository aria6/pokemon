import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Header from '../generals/components/Header';

import { GET_POKEMONS } from '../generals/querys';
import { useMyPokemon } from '../generals/context/myPokemonContext';

function PokemonList() {
  let navigate = useNavigate();
  let { myPokemon } = useMyPokemon();

  let [limit, setLimit] = useState(10);
  let [activePage, setActivePage] = useState(1);

  let { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: Number(limit), offset: limit * (activePage - 1) },
  });

  let count = data?.pokemons?.count || 0;
  let pages = Math.ceil(count / limit);

  let pageComponent = (amountPage, activePage) => {
    let arr = [];

    if (activePage > 1) {
      arr.push(
        <PagingItem onClick={() => setActivePage(1)}>{'|<'}</PagingItem>
      );
      arr.push(
        <PagingItem
          onClick={() =>
            setActivePage(activePage <= 1 ? activePage : activePage - 1)
          }
        >
          {'<'}
        </PagingItem>
      );
    }

    for (let i = 1; i <= amountPage; i++) {
      if (
        (i >= activePage - 2 && i <= activePage) ||
        (i >= activePage && i <= activePage + 2)
      ) {
        arr.push(
          <PagingItem
            selected={i === activePage}
            onClick={() => setActivePage(i)}
          >
            {i}
          </PagingItem>
        );
      }
    }

    if (activePage < pages) {
      arr.push(
        <PagingItem
          onClick={() =>
            setActivePage(
              activePage >= amountPage ? activePage : activePage + 1
            )
          }
        >
          {'>'}
        </PagingItem>
      );
      arr.push(
        <PagingItem onClick={() => setActivePage(amountPage)}>
          {'>|'}
        </PagingItem>
      );
    }

    return arr;
  };

  return (
    <Container>
      <Header />
      <Toolbar>
        <ToolbarItem>
          <label>Show data : </label>
          <select
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
              setActivePage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </ToolbarItem>
        <ToolbarItem>
          {!loading && pageComponent(pages, activePage)}
        </ToolbarItem>
      </Toolbar>
      <div style={styles.contentWrapper}>
        {loading && <div>Loading</div>}
        {error && <div>error</div>}
        {data &&
          data.pokemons.results.map((item, index) => {
            return (
              <div
                style={styles.itemList}
                onClick={() => {
                    // TODO : Change the best apparoach, because pokemon detail not provide the image
                    localStorage.setItem('imagePokemon', item.image);
                    navigate(`/pokemon_detail/${item.name}`);
                }}
                key={`pokemonList-${index}`}
              >
                {item.image && (
                  <img src={item.image} width={100} height={100} loading="lazy" alt='pokemon' />
                )}
                <div>{item.name}</div>
                <OwnedWrapper>
                  owened :{' '}
                  {myPokemon.reduce(
                    (acc, cur) => (cur.name === item.name ? acc + 1 : acc),
                    0
                  )}
                </OwnedWrapper>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

const PagingItem = styled.div`
  margin-left: 3px;
  margin-right: 3px;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  cursor: pointer;
`;

const Container = styled.div`
  background-color: white;
  height: 100%;
  border: solid;
  border-width: 0.5px;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ToolbarItem = styled.div`
  margin: 20px 10px 20px 10px;
  display: flex;
  flex-direction: row;
`;

const OwnedWrapper = styled.div`
  font-weight: normal;
`;

// TODO : I dont know the issues yet, when i want to implement display flex on emotion/styled is not work like what i want
let styles = {
  itemList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 5,
    flex: '0 0 10%',
    fontWeight: 'bold',
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    maxHeight: '80%',
    justifyContent: 'space-around',
  },
};

export default PokemonList;
