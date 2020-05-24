import React, { FC, useEffect, useState } from "react";
import { fetchApi } from "./helpers/graphql";
import { getItemStorage, setItemStorage } from "./helpers/localstorage";

const MINUTES_TO_EXPIRE = 5;

interface Post {
  id: string;
  title: string;
  url: string;
}

const latestTiming = new Date().toISOString();

const POSTS_QUERY = `
  query Latest($params: QueryPostInput) {
    latest(params: $params) {
      id
      url
      title
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
      pageSize: 10,
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
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title={post.title}
              href={post.url}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
