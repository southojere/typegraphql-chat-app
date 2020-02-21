import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import config from "./config";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Notes from "./pages/Notes";
import Error from "./pages/404";
import LoginPage from "./pages/Login";
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
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/notes" component={Notes} exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
