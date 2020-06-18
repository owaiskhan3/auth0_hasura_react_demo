import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

// import Hero from "../components/Hero";
// import Content from "../components/Content";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos {
      id
      todo
    }
  }
`;

const Home = () => {
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
      {data.todos.map((todo, index) => (
        <div key={index}>{todo.todo}</div>
      ))}
    </Fragment>
  );
};
export default Home;
