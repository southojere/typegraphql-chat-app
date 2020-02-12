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
  const [errors, setErrors] = React.useState(null);
  return (
    <ApolloProvider client={client}>
      <div className="App absolute w-full h-full flex justify-center items-center">
        <div className="w-full max-w-md bg-grey-800">
          <Login />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
