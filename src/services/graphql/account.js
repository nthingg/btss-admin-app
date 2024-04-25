import { gql } from "@apollo/client";

export const LOAD_TRAVELER_ACCOUNT_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String, $phone: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { in: $role }, phone: { contains: $phone } }
      searchTerm: $searchTerm
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
        plans {
          id
        }
        publishedPlanCount
      }
    }
  }
`;

export const LOAD_ACCOUNTS_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { in: $role } }
      searchTerm: $searchTerm
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
        plans {
          id
        }
        publishedPlanCount
      }
    }
  }
`;

export const LOAD_TRAVELER_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String, $phone: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { in: $role }, phone: { contains: $phone }, publishedPlanCount: { gt: 0 } }
      searchTerm: $searchTerm
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
        plans {
          id
        }
        publishedPlanCount
      }
      totalCount
    }
  }
`

export const LOAD_NON_TRAVELER_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String, $phone: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { in: $role }, phone: { contains: $phone }, publishedPlanCount: { lte: 0 } }
      searchTerm: $searchTerm
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
        plans {
          id
        }
        publishedPlanCount
      }
      totalCount
    }
  }
`

export const LOAD_ACCOUNT_TRAVELERS_OPTIONS = gql`
  query LoadTravelerOptions($searchTerm: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: { role: { eq: TRAVELER } }
      searchTerm: $searchTerm
    ) {
      nodes {
        id
        name
      }
    }
  }
`

export const LOAD_ACCOUNTS = gql`
  query LoadAccount($searchTerm: String) {
    accounts(first: 100, order: { id: ASC }, searchTerm: $searchTerm) {
      nodes {
        id
        role
        plans {
          id
        }
        publishedPlanCount
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
          utcStartAt
          maxMemberCount
          memberCount
          utcEndAt
          status
        }
      }
    }
  }
`;

export const LOAD_ACCOUNT_USERS = gql`
  {
    accounts(where: { role: { eq: TRAVELER } }) {
      totalCount
    }
  }
`;

export const LOAD_ACCOUNTS_TRAVELER = gql`
  query {
    accounts(where: { plans: { some: { isPublished: { eq: true } } } }) {
      totalCount
    }
  }
`;

export const LOAD_NUMBERS_NEWEST_TRAVELER = gql`
  query QueryNewAccounts($input: DateTime) {
    accounts(where: { role: { eq: TRAVELER }, createdAt: { gte: $input } }) {
      totalCount
    }
  }
`;

export const LOAD_PROVIDER_INIT = gql`
  query LoadProviders {
    noAccountProviders(
      first: 100
      order: { id: DESC }
      where: {
        isActive: { eq: true }
        type: { nin: [EMERGENCY, GROCERY, REPAIR, TAXI] }
      }
    ) {
      edges {
        node {
          id
          name
          address
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

export const LOAD_PROVIDER = gql`
  query LoadProviders($cursor: String!) {
    noAccountProviders(
      first: 100
      order: { id: DESC }
      after: $cursor
      where: {
        isActive: { eq: true }
        type: { nin: [EMERGENCY, GROCERY, REPAIR, TAXI] }
      }
    ) {
      edges {
        node {
          id
          name
          address
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

export const GET_PROVIDER_BRIEF_BY_ID = gql`
  query GetProvidersBrief($id: Int!) {
    providers(where: { id: { eq: $id } }) {
      nodes {
        id
        address
        type
        imagePath
      }
    }
  }
`;

export const CHANGE_STATUS_ACCOUNT = gql`
  mutation changeStatusDes($id: Int!) {
    changeAccountStatus(accountId: $id) {
      id
      name
    }
  }
`;
