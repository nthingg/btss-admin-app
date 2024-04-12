import { gql } from "@apollo/client";

export const LOAD_PRODUCTS_BY_PROVIDER = gql`
  query GetProductsByProvider($id: Int!, $type: [ProductType!]) {
    products(
      where: {
        providerId: { eq: $id }
        type: { in: $type }
        periods: { some: { in: [NOON] } }
      }
    ) {
      nodes {
        id
        name
        price
        periods
      }
    }
  }
`;
