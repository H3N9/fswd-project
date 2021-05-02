import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {OrderProvider} from './context/orderContext'
import {SessionProvider} from './context/session'
import {CookiesProvider} from 'react-cookie'
import {setContext} from '@apollo/client/link/context'


const httpLink = createHttpLink({
  uri: 'https://fswd-book-store.herokuapp.com/graphql',
});

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const authLink = setContext((_, { headers }) => {
  const token = getCookie("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: authLink.concat(httpLink),
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
