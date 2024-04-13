import { gql } from "@apollo/client";

export const LOAD_TRANSACTIONS_FILTER = gql`
  query LoadTransactions($type: [TransactionType!]) {
    transactions(
      first: 100
      order: { id: DESC }
      where: { type: { in: $type } }
    ) {
      nodes {
        id
        orderId
        type
        status
        gcoinAmount
        gateway
        bankTransCode
        createdAt
        provider {
          name
        }
        account {
          name
        }
        provider {
          name
        }
      }
    }
  }
`;

export const LOAD_TRAVELER_TRANSACTIONS = gql`
  query TravelerTransaction($id: Int) {
    transactions(
      first: 20
      order: { id: DESC }
      where: { accountId: { eq: $id } }
    ) {
      nodes {
        id
        orderId
        type
        status
        gcoinAmount
        gateway
        bankTransCode
        createdAt
        provider {
          name
        }
        account {
          name
        }
        provider {
          name
        }
      }
    }
  }
`

export const LOAD_TRANSACTIONS_TOTAL = gql`
  query {
    transactions {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_GIFT = gql`
  query {
    transactions(where: { type: { eq: GIFT } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_ORDER = gql`
  query {
    transactions(where: { type: { eq: ORDER } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_ORDER_REFUND = gql`
  query {
    transactions(where: { type: { eq: ORDER_REFUND } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_PLAN_FUND = gql`
  query {
    transactions(where: { type: { eq: PLAN_FUND } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_PLAN_REFUND = gql`
  query {
    transactions(where: { type: { eq: PLAN_REFUND } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const LOAD_TRANSACTIONS_TOPUP = gql`
  query {
    transactions(where: { type: { eq: TOPUP } }) {
      edges {
        node {
          id
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
