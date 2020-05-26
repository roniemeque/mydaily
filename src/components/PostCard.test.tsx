import React from "react";
import { render } from "@testing-library/react";
import PostCard from "./PostCard";
import { posts } from "../mocks/posts";
const [post] = posts;

test("renders post basic info", () => {
  const { getByText } = render(<PostCard post={post} />);
  const title = getByText(post.title);
  expect(title).toBeInTheDocument();

  const publicatorName = getByText(post.publication.name);
  expect(publicatorName).toBeInTheDocument();
});

test("should render post thumbnail", () => {
  const { getByAltText } = render(<PostCard post={post}></PostCard>);
  const postThumb = getByAltText(post.title);
  expect(postThumb).toBeInTheDocument();
});

test("should render tags correctly", () => {
  const { getByText } = render(<PostCard post={post}></PostCard>);
  const tag = getByText(post.tags[0]);
  expect(tag).toBeInTheDocument();
});
