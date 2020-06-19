import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useAuth0 } from "../react-auth0-spa";

import Hero from "../components/Hero";
import Content from "../components/Content";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos {
      id
      todo
    }
  }
`;

const Home = () => {
  const { isAuthenticated } = useAuth0();
  const { loading, error, data } = useQuery(GET_MY_TODOS);
  console.log(data, "data");
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <Fragment>
      {isAuthenticated ? (
        data.todos.map((todo, index) => <div key={index}>{todo.todo}</div>)
      ) : (
        <div>
          <Hero />
          <Content />
        </div>
      )}
    </Fragment>
  );
};
export default Home;
