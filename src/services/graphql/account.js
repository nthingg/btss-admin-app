import { gql } from "@apollo/client";

export const LOAD_TRAVELER_ACCOUNT_FILTER = gql`
  query LoadAccounts($role: [Role!], $searchTerm: String) {
    accounts(
      first: 100
      order: { id: DESC }
      where: {
        role: { in: $role }
        name: { nstartsWith: "test-account-" }
        phone: { contains: $searchTerm }
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
  query LoadAccounts($role: [Role!]) {
    accounts(
      first: 100
      order: { id: DESC }
      where: {
        role: { in: $role }
        name: { nstartsWith: "test-account-" }
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

export const LOAD_ACCOUNTS = gql`
  {
    accounts(
      first: 100
      order: { id: ASC }
      where: { name: { nstartsWith: "test-account-" } }
    ) {
      nodes {
        id
        role
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
          departDate
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
      where: { role: { eq: TRAVELER }, name: { nstartsWith: "test-account-" } }
    ) {
      nodes {
        id
        role
      }
    }
  }
`;
