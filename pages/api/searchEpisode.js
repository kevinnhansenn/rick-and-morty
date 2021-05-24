import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const id = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query {
          episode(id: ${id}) {
            id
            name
            air_date
            created
            characters {
              id
              name
              image
            }
          }
        }
      `,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};
