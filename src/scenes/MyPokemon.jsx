import React, { useState } from 'react';
import styled from '@emotion/styled';

import Header from '../generals/components/Header';
import { useMyPokemon } from '../generals/context/myPokemonContext';

function MyPokemon() {
  let { myPokemon, setMyPokemon } = useMyPokemon();

  let [limit, setLimit] = useState(10);
  let [activePage, setActivePage] = useState(1);

  let count = myPokemon.length;
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
      <Title>My Pokemon List</Title>
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
        <ToolbarItem>{pageComponent(pages, activePage)}</ToolbarItem>
      </Toolbar>
      <div style={styles.contentWrapper}>
        {myPokemon &&
          myPokemon.map((item, index) => {
            return (
              <div style={styles.itemList} key={`pokemonList-${index}`}>
                {item.image && (
                  <img src={item.image} width={100} height={100} loading="lazy" alt='my-pokemon-img' />
                )}
                <div>{item.nickname}</div>
                <PokemonName>{item.name}</PokemonName>
                <button
                  style={styles.releaseButton}
                  onClick={() => {
                    if (
                      window.confirm('Are you sure want release this pokemon?')
                    ) {
                      setMyPokemon([
                        ...myPokemon.filter((it) => it.nickname !== item.nickname),
                      ]);
                    }
                  }}
                >
                  Release
                </button>
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

const Title = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const PokemonName = styled.div`
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
  releaseButton: { marginTop: 4 },
};

export default MyPokemon;
