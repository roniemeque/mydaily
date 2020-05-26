interface Post {
  id: string;
  title: string;
  url: string;
  image: string;
  tags: string[];
  publication: {
    id: string;
    name: string;
  };
}
