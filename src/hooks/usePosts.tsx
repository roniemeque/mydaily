import { fetchApi } from "../helpers/graphql";
import { getItemStorage, setItemStorage } from "../helpers/localstorage";
import { useState, useEffect } from "react";

const MINUTES_TO_EXPIRE = 5;

const latestTiming = new Date().toISOString();

const POSTS_QUERY = `
  query Latest($params: QueryPostInput) {
    latest(params: $params) {
      id
      url
      title
      image
      # readTime
      tags
      publication {
        id
        name
      }
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

const usePosts = (): [Post[]] => {
  const [posts, setPosts] = useState<Post[]>(
    getItemStorage("posts", 1000 * 60 * MINUTES_TO_EXPIRE) ?? [],
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

  return [posts];
};

export default usePosts;
