import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {OrderProvider} from './context/orderContext'
import {SessionProvider} from './context/session'
import {CookiesProvider} from 'react-cookie'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
})

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <ApolloProvider client={client}>
          <SessionProvider>
            <OrderProvider>
            <App />
            </OrderProvider>
          </SessionProvider>
        </ApolloProvider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
