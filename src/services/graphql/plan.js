import { gql } from "@apollo/client";

export const LOAD_PLANS_FILTER = gql`
  query LoadPlans($status: [PlanStatus!]) {
    plans(first: 100, order: { id: DESC }, where: { status: { in: $status } }) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
    }
  }
`;

export const LOAD_PLANS = gql`
  {
    plans(first: 100, order: { id: ASC }) {
      nodes {
        id
        status
      }
    }
  }
`;

export const LOAD_DETAIL_PLAN = gql`
  query GetPlanById($id: Int!) {
    plans(where: { id: { eq: $id } }) {
      nodes {
        id
        name
        account {
          id
          name
          phone
        }
        regCloseAt
        createdAt
        actualGcoinBudget
        memberCount
        maxMemberCount
        status
        departDate
        departure {
          coordinates
        }
        destination {
          id
          name
          coordinate {
            coordinates
          }
        }
        startDate
        endDate
        gcoinBudgetPerCapita
        savedContacts {
          imagePath
          name
          phone
          address
        }
      }
    }
  }
`;

export const LOAD_NUMBERS_CANCELED = gql`
  query {
    plans(where: { status: { eq: CANCELED } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_COMPLETED = gql`
  query {
    plans(where: { status: { eq: COMPLETED } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_FLAWED = gql`
  query {
    plans(where: { status: { eq: FLAWED } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_PENDING = gql`
  query {
    plans(where: { status: { eq: PENDING } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_READY = gql`
  query {
    plans(where: { status: { eq: READY } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_REGISTERING = gql`
  query {
    plans(where: { status: { eq: REGISTERING } }) {
      edges {
        node {
          id
          name
          status
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

export const LOAD_NUMBERS_VERIFIED = gql`
  query {
    plans(where: { status: { eq: VERIFIED } }) {
      edges {
        node {
          id
          name
          status
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
