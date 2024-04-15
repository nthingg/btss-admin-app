import { gql } from "@apollo/client";

export const LOAD_PLANS_FILTER = gql`
  query LoadPlans($status: [PlanStatus!], $searchTerm: String) {
    plans(
      first: 100
      order: { id: DESC }
      where: { status: { in: $status } }
      searchTerm: $searchTerm
    ) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
    }
  }
`;

export const LOAD_TOTAL_PLAN = gql`
  query LoadTotalPlans($searchTerm: String) {
    plans(
      first: 100
      order: { id: DESC }
      where: {
        status: {
          in: [REGISTERING, READY, VERIFIED, COMPLETED, CANCELED, FLAWED]
        }
      }
      searchTerm: $searchTerm
    ) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
    }
  }
`;

export const LOAD_PLANS_PUBLISHED_FILTER = gql`
  query LoadPlans($searchTerm: String) {
    plans(
      first: 100
      order: { id: DESC }
      where: { isPublished: { eq: true } }
      searchTerm: $searchTerm
    ) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
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

export const LOAD_PLAN_READY = gql`
  query ReadyPlans($searchTerm: String, $dateTime: DateTime) {
    plans(
      first: 100
      order: { id: DESC }
      where: { utcDepartAt: { gt: $dateTime }, status: { eq: READY } }
      searchTerm: $searchTerm
    ) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
    }
  }
`;

export const LOAD_PLAN_ONGOING = gql`
  query OnGoingPlan($searchTerm: String, $dateTime: DateTime) {
    plans(
      where: {
        status: { in: [READY, VERIFIED] }
        utcDepartAt: { lte: $dateTime }
        utcEndAt: { gte: $dateTime }
      }
      searchTerm: $searchTerm
    ) {
      nodes {
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
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
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
        utcRegCloseAt
        createdAt
        actualGcoinBudget
        memberCount
        maxMemberCount
        status
        utcDepartAt
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
        savedProviders {
          provider {
            imagePath
            name
            phone
            address
          }
        }
        orders {
          id
          createdAt
          currentStatus
          type
          total
        }
      }
    }
  }
`;

export const LOAD_NUMBERS_CANCELED = gql`
  query NumerOfCancel($searchTerm: String) {
    plans(where: { status: { eq: CANCELED } }, searchTerm: $searchTerm) {
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
  query NumberOfComplete($searchTerm: String) {
    plans(
      where: { status: { in: [COMPLETED, FLAWED] } }
      searchTerm: $searchTerm
    ) {
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

export const LOAD_NUMBERS_ONGOING = gql`
  query OnGoingPlan($searchTerm: String, $dateTime: DateTime) {
    plans(
      where: {
        status: { in: [READY, VERIFIED] }
        utcDepartAt: { lte: $dateTime }
        utcEndAt: { gte: $dateTime }
      }
      searchTerm: $searchTerm
    ) {
      totalCount
    }
  }
`;

export const LOAD_NUMBERS_PENDING = gql`
  query PendingPlans($searchTerm: String) {
    plans(where: { status: { eq: PENDING } }, searchTerm: $searchTerm) {
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
  query ReadyPlans($searchTerm: String, $dateTime: DateTime) {
    plans(
      where: { utcDepartAt: { gt: $dateTime }, status: { eq: READY } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
          id
          name
          status
        }
      }
      totalCount
    }
  }
`;

export const LOAD_NUMBERS_REGISTERING = gql`
  query RegisteringPlans($searchTerm: String) {
    plans(where: { status: { eq: REGISTERING } }, searchTerm: $searchTerm) {
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
  query VerifiedPlan($searchTerm: String) {
    plans(where: { status: { eq: VERIFIED } }, searchTerm: $searchTerm) {
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

export const LOAD_NUMBERS_PUBLISHED = gql`
  query PublishedPlans($searchTerm: String) {
    plans(where: { isPublished: { eq: true } }, searchTerm: $searchTerm) {
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

export const LOAD_NUMBERS_TOTAL = gql`
  query {
    plans(
      where: {
        status: {
          in: [REGISTERING, READY, VERIFIED, COMPLETED, CANCELED, FLAWED]
        }
      }
    ) {
      totalCount
    }
  }
`;

export const LOAD_DESTINATION_PLANS = gql`
  query LoadPlans($id: Int) {
    plans(
      first: 100
      order: { id: DESC }
      where: {
        destinationId: { eq: $id }
        status: { in: [REGISTERING, READY, COMPLETED, FLAWED, CANCELED] }
      }
    ) {
      nodes {
        id
        name
        account {
          name
        }
        utcDepartAt
        startDate
        memberCount
        maxMemberCount
        endDate
        status
      }
      totalCount
    }
  }
`;
