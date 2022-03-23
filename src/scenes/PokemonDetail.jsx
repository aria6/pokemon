import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import Header from '../generals/components/Header';

import { chance50percent } from '../generals/helpers';

import { useMyPokemon } from '../generals/context/myPokemonContext';
import { GET_POKEMON_DETAIL } from '../generals/querys';

function PokemonDetail() {
  let { myPokemon, setMyPokemon } = useMyPokemon();
  let { pokemon } = useParams();

  let [isModalOpen, setModalOpen] = useState(false);
  let [isNicknameExist, setIsNicknameExist] = useState(false);

  let { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: pokemon },
  });

  let image =
    localStorage.getItem('imagePokemon') ||
    'https://www.kindpng.com/picc/m/119-1191280_transparent-pokemon-transparent-png-pokemon-egg-png-download.png';

  let renderModal = () => {
    let isSuccess = chance50percent();

    return (
      <ModalContainer>
        <ModalContent>
          <img
          loading="lazy"
            src='https://thumbs.gfycat.com/DampSpanishCleanerwrasse-max-1mb.gif'
            width='50%'
            alt='catch-pokemon'
          />
          <SuccessMessage>{isSuccess ? 'Gotcha' : 'Ah fail'}</SuccessMessage>
          {isSuccess ? (
            <SuccessBox>
              <LabelNickname>Give nickname :</LabelNickname>
              <Input
                id='nickname'
                defaultValue={`${data?.pokemon.name || ''}_${String(
                  Math.random()
                ).slice(-5)}`}
                isError={isNicknameExist}
              />
              {isNicknameExist && (
                <NicknameError>nickname already taken</NicknameError>
              )}
              <SuccessGroupButton>
                <ReleaseButton onClick={() => setModalOpen(false)}>
                  Release
                </ReleaseButton>
                <SaveButton
                  onClick={() => {
                    let nickname = document.getElementById('nickname').value;

                    if (myPokemon.find((item) => item.nickname === nickname)) {
                      setIsNicknameExist(true);
                      return;
                    }

                    setMyPokemon([
                      ...myPokemon,
                      {
                        id: data?.pokemon.id || '',
                        name: data?.pokemon.name || '',
                        nickname: nickname,
                        image,
                        type: data.pokemon.types.map((item) => item.type.name),
                        weight: data.pokemon.weight,
                        abilities: data.pokemon.abilities.map(
                          (item) => item.ability.name
                        ),
                        stats: data.pokemon.stats.map((item) => ({
                          name: item.stat.name,
                          value: item.base_stat,
                        })),
                      },
                    ]);
                    setIsNicknameExist(false);
                    setModalOpen(false);
                  }}
                >
                  Save
                </SaveButton>
              </SuccessGroupButton>
            </SuccessBox>
          ) : (
            <ErrorBox>
              <ReleaseButton onClick={() => setModalOpen(false)}>
                Back
              </ReleaseButton>
            </ErrorBox>
          )}
        </ModalContent>
      </ModalContainer>
    );
  };

  return (
    <Container>
      <Header />
      {isModalOpen && renderModal()}
      {error && <div>error</div>}
      {loading && <div>Loading</div>}
      {data && (
        <div>
          <Toolbar>
            <ToolbarItem>
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Catch
              </Button>
            </ToolbarItem>
          </Toolbar>
          <PokemonInfoWrapper>
            <img src={image} width='40%' loading="lazy" alt="pokemon" />
            <TitlePokemonName>{data?.pokemon.name || ''}</TitlePokemonName>
            <TypeWrapper>
              {data.pokemon.types.map((item, index) => {
                return (
                  <TypeBox key={`type-${index}`}>{item.type.name}</TypeBox>
                );
              })}
            </TypeWrapper>
            <ItemDetail>
              <ItemTitleDetail>weight</ItemTitleDetail>
              <div>{data.pokemon.weight}</div>
            </ItemDetail>
            {data.pokemon.stats.map((item, index) => {
              return (
                <ItemDetail>
                  <ItemTitleDetail key={`stats-${index}`}>
                    {item.stat.name}
                  </ItemTitleDetail>
                  <div>{item.base_stat}</div>
                </ItemDetail>
              );
            })}
            <Subtitle>Ability :</Subtitle>
            {data.pokemon.abilities.map((item, index) => {
              return (
                <ItemDetail key={`abilities-${index}`}>
                  <ItemTitleDetail>{item.ability.name}</ItemTitleDetail>
                  <div>?</div>
                </ItemDetail>
              );
            })}
            <Subtitle>Moves :</Subtitle>
            <MovesWrapper>
              {data.pokemon.moves.map((item, index) => {
                return (
                  <ItemDetail2 key={`moves-${index}`}>
                    <ItemTitleDetail>{item.move.name}</ItemTitleDetail>
                    <div>?</div>
                  </ItemDetail2>
                );
              })}
            </MovesWrapper>
          </PokemonInfoWrapper>
        </div>
      )}
    </Container>
  );
}

const ItemDetail2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3px;
`;

const ItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 3px;
`;

const ItemTitleDetail = styled.div`
  font-weight: bold;
`;

const TypeBox = styled.div`
  border: solid;
  padding: 2px 10px 2px 10px;
  border-radius: 5px;
  margin-right: 5px;
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
  justify-content: flex-end;
  align-items: center;
`;

const ToolbarItem = styled.div`
  margin: 20px 10px 20px 10px;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: #2e7d32;
  border-color: #2e7d32;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
`;

const SaveButton = styled.button`
  background-color: #2e7d32;
  border-color: #2e7d32;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  width: 80px;
`;

const ReleaseButton = styled.button`
  background-color: #d32f2f;
  border-color: #d32f2f;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  width: 80px;
`;

const ModalContainer = styled.div`
  height: 100%;
  background-color: rgb(3 3 3 / 67%);
  position: absolute;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 414px;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 60%;
  min-height: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SuccessMessage = styled.div`
  margin-bottom: 10px;
`;

const NicknameError = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
  color: red;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin-top: 10px;
`;

const SuccessGroupButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
`;

const LabelNickname = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MovesWrapper = styled.div`
  height: 100px;
  width: 90%;
  overflow: scroll;
`;

const Subtitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const TitlePokemonName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const PokemonInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border-color: ${(props) => (props.isError ? 'red' : 'black')};
`;

export default PokemonDetail;
