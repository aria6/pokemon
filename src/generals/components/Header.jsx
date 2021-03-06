import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';

const POKEMON_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png';

function Header() {
  let navigate = useNavigate();
  let { pathname } = useLocation();

  return (
    <Container>
      {pathname === '/' ? (
        <img src={POKEMON_IMAGE} height='35vp' loading="lazy" alt='pokemon-logo' />
      ) : (
        <BackButton onClick={() => navigate('../')}>
          <div>&larr; Back</div>
        </BackButton>
      )}
      <Button onClick={() => navigate('../my_pokemon')}>My Pokemons</Button>
    </Container>
  );
}

const Button = styled.button`
  background-color: #007fff;
  border-color: #007fff;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  min-height: 64px;
  box-shadow: black 0px 0px 8px 0px;
  background-color: white;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400px;
  cursor: pointer;
`;

export default Header;
