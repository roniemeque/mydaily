import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import "./App.css";
import PostList from "./PostList";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "/graphql"
        : "https://app.dailynow.co",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList></PostList>
    </ApolloProvider>
  );
}

export default App;
