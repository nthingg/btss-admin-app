import { gql } from "@apollo/client";

export const LOAD_PRODUCTS_BY_PROVIDER = gql`
  query GetProductsByProvider($id: Int!, $type: [ProductType!]) {
    products(where: { providerId: { eq: $id }, type: { in: $type } }) {
      nodes {
        id
        name
        price
      }
    }
  }
`;
