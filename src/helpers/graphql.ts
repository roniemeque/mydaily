export const fetchApi = async (query: string, variables: any): Promise<any> => {
  try {
    const res = await fetch(
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
          query,
          variables,
        }),
      }
    );
    const { data } = await res.json();

    return data;
  } catch (error) {}
};
