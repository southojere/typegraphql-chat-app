import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import config from "./config";
import Login from "./components/Login";

const uri = config.api;

const client = new ApolloClient({
  uri,
  request: operation => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    operation.setContext({
      headers: {
        "x-authorization": token ? token : "",
        "x-refresh-token": refreshToken ? refreshToken : ""
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      // logoutUser();
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Login/>
    </ApolloProvider>
  );
}

export default App;
