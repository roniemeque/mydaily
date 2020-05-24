import React, { FC, useEffect, useState } from "react";
import { fetchApi } from "./helpers/graphql";

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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
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
