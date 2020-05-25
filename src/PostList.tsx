import React, { FC, useEffect, useState } from "react";
import { fetchApi } from "./helpers/graphql";
import { getItemStorage, setItemStorage } from "./helpers/localstorage";
import styled from "@emotion/styled";

const MINUTES_TO_EXPIRE = 5;

interface Post {
  id: string;
  title: string;
  url: string;
  image: string;
}

const latestTiming = new Date().toISOString();

const POSTS_QUERY = `
  query Latest($params: QueryPostInput) {
    latest(params: $params) {
      id
      url
      title
      image
      # readTime
      # tags
      # publication {
      #   id
      #   name
      #   image
      # }
    }
  }
`;

const fetchPosts = async (): Promise<Post[]> => {
  const { latest } = await fetchApi(POSTS_QUERY, {
    params: {
      latest: latestTiming,
      page: 0,
      pageSize: 20,
      sortBy: "popularity",
    },
  });

  return latest;
};

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>(
    getItemStorage("posts", 1000 * 60 * MINUTES_TO_EXPIRE) ?? []
  );

  useEffect(() => {
    if (!posts.length) {
      fetchPosts().then((data) => {
        console.log("fetching new posts");

        setPosts(data);
        setItemStorage("posts", data);
      });
    } else {
      console.log("got from localstorage");
    }
  }, []);

  return (
    <PostListStyled>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title={post.title}
              href={post.url}
            >
              <PostCard>
                <img src={post.image} alt={post.title} />
                <h2>{post.title}</h2>
              </PostCard>
            </a>
          </li>
        ))}
      </ul>
    </PostListStyled>
  );
};

const PostListStyled = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 16rem));
    justify-content: space-around;
    gap: 1rem;
    row-gap: 3rem;
    list-style: none;
  }
`;

const PostCard = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-rows: 10rem auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  h2 {
    font-size: 1.1rem;
  }
`;

export default PostList;
