import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Users from './components/Users'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Routes /> */}
      <Users/>
    </ApolloProvider>
  );
}

export default App;
