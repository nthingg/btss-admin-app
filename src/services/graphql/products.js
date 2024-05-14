import { gql } from "@apollo/client";

export const LOAD_PRODUCTS_BY_PROVIDER = gql`
  query GetProductsByProvider(
    $id: Int!
    $type: [ProductType!]
    $period: [Period!]
  ) {
    products(
      first: 100
      where: {
        providerId: { eq: $id }
        type: { in: $type }
        periods: { some: { in: $period } }
      }
    ) {
      nodes {
        id
        name
        price
        periods
        partySize
      }
    }
  }
`;
