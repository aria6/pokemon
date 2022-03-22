import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styled from '@emotion/styled';

import { POKEMON_GRAPHQL_URI } from './generals/constants';

import logo from './logo.svg';
import './App.css';

function App() {
  const client = new ApolloClient({
    uri: POKEMON_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Container>
        <MobileView>
          <div className='App'>
            <header className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className='App-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn React
              </a>
            </header>
          </div>
        </MobileView>
      </Container>
    </ApolloProvider>
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
