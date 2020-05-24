import { gql, useQuery } from "@apollo/client";
import React, { FC } from "react";

interface Post {
  id: string;
  title: string;
  url: string;
}

const latestTiming = new Date().toISOString();

const POSTS_QUERY = gql`
  query Latest($params: QueryPostInput) {
    latest(params: $params) {
      id
      url
      title
      readTime
      tags
      publication {
        id
        name
        image
      }
    }
  }
`;

const PostList: FC = () => {
  const { loading, error, data } = useQuery<{
    latest: Post[];
  }>(POSTS_QUERY, {
    variables: {
      params: {
        latest: latestTiming,
        page: 1,
        pageSize: 30,
        sortBy: "popularity",
      },
    },
  });

  if (loading) return <p>loading...</p>;
  if (error || !data) return <p>error check console</p>;

  const { latest } = data;
  console.log(latest);

  return (
    <div>
      <ul>
        {latest.map((post) => (
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
