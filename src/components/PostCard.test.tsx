import React from "react";
import { render } from "@testing-library/react";
import PostCard from "./PostCard";

const post = {
  id: "1",
  title: "Cool Post",
  url: "https://post.cool",
  image: "post-image",
  tags: ["tag1", "tag2"],
  publication: {
    id: "1",
    name: "The Posts Place",
  },
};

test("renders post basic info", () => {
  const { getByText } = render(<PostCard post={post} />);
  const title = getByText(/cool post/i);
  expect(title).toBeInTheDocument();

  const publicatorName = getByText(/posts place/i);
  expect(publicatorName).toBeInTheDocument();
});

test("should render post thumbnail", () => {
  const { getByAltText } = render(<PostCard post={post}></PostCard>);
  const postThumb = getByAltText(/cool post/i);
  expect(postThumb).toBeInTheDocument();
});

test("should render tags correctly", () => {
  const { getAllByText } = render(<PostCard post={post}></PostCard>);
  const tags = getAllByText(/tag/i);
  expect(tags).toHaveLength(2);
});
