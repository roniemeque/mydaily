import React from "react";
import PostList from "./PostList";
import styled from "@emotion/styled";

function App() {
  return (
    <Container>
      <PostList></PostList>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
`;

export default App;
