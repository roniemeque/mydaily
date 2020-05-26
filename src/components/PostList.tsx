import styled from "@emotion/styled";
import React, { FC } from "react";
import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";

const PostList: FC = () => {
  const [posts, loadPosts] = usePosts();

  return (
    <List>
      {posts.map((post) => (
        <li key={post.id}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={post.title}
            href={post.url}
          >
            <PostCard post={post}>
            </PostCard>
          </a>
        </li>
      ))}
      <span onClick={() => loadPosts()}>reload</span>
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 16rem));
  justify-content: space-around;
  gap: 1rem;
  row-gap: 3rem;
  list-style: none;
`;

export default PostList;
