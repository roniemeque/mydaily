import React, { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({ post }) =>
  <Card>
    <img src={post.image} alt={post.title} />
    <strong className="from">{post.publication.name}</strong>
    <h2>{post.title}</h2>
    <ul className="tags">
      {post.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  </Card>;

const Card = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-rows: 10rem auto;
  transition: all .3s;
  &:hover{
    transform: translateY(-2px);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  h2 {
    font-size: 1.1rem;
  }
  .from {
    text-transform: uppercase;
    font-weight: lighter;
    font-size: 0.9rem;
    color: #F012BE;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8rem;
    li {
      &:not(:first-of-type){
        margin-left: 0.3rem;
      }
    }
  }
`;

export default PostCard;
