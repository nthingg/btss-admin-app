import { gql } from "@apollo/client";

export const LOAD_TRAVELER_ACCOUNT_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: {
        role: { in: $role }
        phone: { contains: $searchTerm }
        plans: { any: true }
      }
    ) {
      nodes {
        id
        name
        phone
        email
        isMale
        isActive
        prestigePoint
        provider {
          name
        }
      }
    }
  }
`;

export const LOAD_ACCOUNTS_FILTER = gql`
  query LoadAccounts($role: [Role!], $havePlan: Boolean) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { in: $role }, plans: { any: $havePlan } }
    ) {
      nodes {
        id
        name
        phone
        email
        isMale
        isActive
        prestigePoint
        provider {
          name
        }
      }
    }
  }
`;

export const LOAD_ACCOUNTS = gql`
  {
    accounts(first: 100, order: { id: ASC }) {
      nodes {
        id
        role
        plans {
          id
        }
      }
    }
  }
`;

export const LOAD_DETAIL_ACCOUNT = gql`
  query GetAccountById($id: Int!) {
    accounts(where: { id: { eq: $id } }) {
      nodes {
        id
        name
        prestigePoint
        isMale
        avatarPath
        phone
        email
        isActive
        plans {
          id
          name
          account {
            name
          }
          destination {
            name
          }
          utcDepartAt
          startDate
          maxMemberCount
          memberCount
          endDate
          status
        }
      }
    }
  }
`;

export const LOAD_ACCOUNTS_TRAVELER = gql`
  {
    accounts(
      first: 100
      order: { id: ASC }
      where: { role: { eq: TRAVELER }, plans: { any: true } }
    ) {
      nodes {
        id
        role
      }
      totalCount
    }
  }
`;

export const LOAD_NUMBERS_NEWEST_TRAVELER = gql`
  query QueryNewAccounts($input: DateTime) {
    accounts(
      first: 100
      order: { id: ASC }
      where: {
        role: { eq: TRAVELER }
        plans: { any: true }
        createdAt: { gte: $input }
      }
    ) {
      totalCount
    }
  }
`;

export const LOAD_PROVIDER = gql`
  query {
    providers(where: { isActive: { eq: true }, account: null }) {
      nodes {
        id
        name
      }
    }
  }
`;

export const CREATE_STAFF = gql`
  mutation createStaff($dto: StaffCreateInput!) {
    createStaff(dto: $dto) {
      id
      name
    }
  }
`;

export const LOAD_TRANSACTIONS_TOTAL_INIT_BY_ACCOUNT = gql`
  query LoadTransactions($type: [TransactionType!], $accId: Int!) {
    transactions(
      first: 100
      order: { id: DESC }
      where: { type: { in: $type }, account: { id: { eq: $accId } } }
    ) {
      edges {
        node {
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

export const LOAD_TRANSACTIONS_TOTAL_BY_ACCOUNT = gql`
  query LoadTransactions(
    $type: [TransactionType!]
    $cursor: String!
    $accId: Int!
  ) {
    transactions(
      first: 100
      order: { id: DESC }
      after: $cursor
      where: { type: { in: $type }, account: { id: { eq: $accId } } }
    ) {
      edges {
        node {
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
