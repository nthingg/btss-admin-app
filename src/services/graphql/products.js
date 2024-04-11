import { gql } from "@apollo/client";

export const LOAD_PRODUCTS_BY_PROVIDER = gql`
  query GetProductsByProvider($id: Int!) {
    products(where: { providerId: { eq: $id } }) {
      nodes {
        id
        name
        price
      }
    }
  }
`;
