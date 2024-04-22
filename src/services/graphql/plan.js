import { gql } from "@apollo/client";

export const LOAD_PLANS_FILTER_INIT = gql`
  query LoadPlansFilterInit($status: [PlanStatus!], $searchTerm: String) {
    plans(
      first: 100
      order: { id: DESC }
      where: { status: { in: $status } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const LOAD_PLANS_FILTER = gql`
  query LoadPlansFilter($status: [PlanStatus!], $searchTerm: String, $cursor: String) {
    plans(
      first: 100
      after: $cursor
      order: { id: DESC }
      where: { status: { in: $status } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const LOAD_TOTAL_PLAN = gql`
  query LoadTotalPlans($searchTerm: String, $endCursor: String) {
    plans(
      first: 100
      after: $endCursor
      order: { id: DESC }
      where: {
        status: {
          in: [REGISTERING, READY, VERIFIED, COMPLETED, CANCELED, FLAWED]
        }
      }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`

export const LOAD_TOTAL_PLAN_INIT = gql`
  query LoadTotalPlansInit($searchTerm: String, $endCursor: String) {
    plans(
      first: 100
      after: $endCursor
      order: { id: DESC }
      where: {
        status: {
          in: [REGISTERING, READY, VERIFIED, COMPLETED, CANCELED, FLAWED]
        }
      }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const LOAD_PLAN_FILTER_ORDERS_INIT = gql`
  query PlanFilterOrderInit(
    $searchTerm: String
    $status: [PlanStatus!]
    $haveOrder: Boolean
  ) {
    plans(
      first: 100
      order: { id: DESC }
      where: { status: { in: $status }, orders: { any: $haveOrder } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const LOAD_PLAN_FILTER_ORDERS = gql`
  query PlanFilterOrder(
    $searchTerm: String
    $endCursor: String
    $status: [PlanStatus!]
    $haveOrder: Boolean
  ) {
    plans(
      first: 100
      after: $endCursor
      order: { id: DESC }
      where: { status: { in: $status }, orders: { any: $haveOrder } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const LOAD_PLANS_PUBLISHED_FILTER_INIT = gql`
  query LoadPlansPublishedInit($searchTerm: String) {
    plans(
      first: 100
      order: { id: DESC }
      where: { isPublished: { eq: true } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const LOAD_PLANS_PUBLISHED_FITLER = gql`
  query LoadPlansPublished($searchTerm: String, $cursor: String) {
    plans(
      first: 100
      after: $cursor
      order: { id: DESC }
      where: { isPublished: { eq: true } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const LOAD_PLAN_COMMING_SOON_INIT = gql`
  query CommingSoonInit($searchTerm: String, $dateTime: DateTime) {
    plans(
      first: 100
      order: { id: DESC }
      where: { utcDepartAt: { gte: $dateTime }, status: { eq: READY } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const LOAD_PLAN_COMMING_SOON = gql`
  query CommingSoon($searchTerm: String, $dateTime: DateTime, $cursor: String) {
    plans(
      first: 100
      after: $cursor
      order: { id: DESC }
      where: { utcDepartAt: { gte: $dateTime }, status: { eq: READY } }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const LOAD_PLAN_ONGOING_INIT = gql`
  query OnGoingPlanInit($searchTerm: String, $dateTime: DateTime) {
    plans(
      first: 100
      order: { id: DESC }
      where: {
        or: [
          { status: { eq: READY }, utcDepartAt: { lte: $dateTime } }
          { status: { eq: VERIFIED } }
        ]
      }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const LOAD_PLAN_ONGOING = gql`
  query OnGoingPlan($searchTerm: String, $dateTime: DateTime, $cursor: String) {
    plans(
      first: 100
      after: $cursor
      order: { id: DESC }
      where: {
        or: [
          { status: { eq: READY }, utcDepartAt: { lte: $dateTime } }
          { status: { eq: VERIFIED } }
        ]
      }
      searchTerm: $searchTerm
    ) {
      edges {
        node {
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
          memberCount
          maxMemberCount
          utcEndAt
          status
          isPublished
          orders {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

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
        utcStartAt
        utcEndAt
        gcoinBudgetPerCapita
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
        or: [
          {
            status: { eq: READY }
            utcDepartAt: { lte: $dateTime }
          }
          { status: { eq: VERIFIED }}
        ]
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
  query CommingSoon($searchTerm: String, $dateTime: DateTime) {
    plans(where: { utcDepartAt: { gte: $dateTime }, status: { eq: READY } }, searchTerm: $searchTerm) {
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
  query LoadTotalPlans($searchTerm: String) {
    plans(
      where: {
        status: {
          in: [REGISTERING, READY, VERIFIED, COMPLETED, CANCELED, FLAWED]
        }
      }
      searchTerm: $searchTerm
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
        utcStartAt
        memberCount
        maxMemberCount
        utcEndAt
        status
      }
      totalCount
    }
  }
`;
