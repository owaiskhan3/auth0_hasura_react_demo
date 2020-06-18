import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import history from "./utils/history";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import { useAuth0 } from "./react-auth0-spa";
// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://demo-hasura-react.herokuapp.com/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const App = ({ idToken }) => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }
  const client = createApolloClient(idToken);

  // console.log("client", client);
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div id="app" className="d-flex flex-column h-100">
          <NavBar />
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
