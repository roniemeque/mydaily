import React, { FC, useEffect, useState } from "react";

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
  const {
    data: { latest },
  } = await (
    await fetch(
      process.env.NODE_ENV === "development"
        ? "/graphql"
        : "https://cors-anywhere.herokuapp.com/https://app.dailynow.co/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: POSTS_QUERY,
          variables: {
            params: {
              latest: latestTiming,
              page: 0,
              pageSize: 10,
              sortBy: "popularity",
            },
          },
        }),
      }
    )
  ).json();
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
