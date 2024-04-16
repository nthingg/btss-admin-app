import { gql } from "@apollo/client";

export const LOAD_DETAIL_DESTINATION = gql`
  query GetDestinationById($id: Int!) {
    destinations(where: { id: { eq: $id } }) {
      nodes {
        id
        name
        description
        imagePaths
        isVisible
        address
        coordinate {
          coordinates
        }
        seasons
        topographic
        activities
        province {
          id
          name
        }
        comments {
          edges {
            node {
              comment
              createdAt
              account {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const LOAD_DESTINATIONS = gql`
  query Destinations($searchTerm: String) {
    destinations(first: 100, order: { id: ASC } searchTerm: $searchTerm) {
      nodes {
        id
        name
        description
        imagePaths
        isVisible
        address
        seasons
        topographic
        activities
        province {
          name
        }
        comments {
          edges {
            node {
              comment
              createdAt
              account {
                name
              }
            }
          }
        }
        coordinate {
          coordinates
        }
      }
    }
  }
`;

export const LOAD_DESTINATIONS_FILTER = gql`
  query LoadDestinations($topo: [Topographic!], $searchTerm: String) {
    destinations(
      first: 100
      order: { id: DESC }
      where: { topographic: { in: $topo } }
      searchTerm: $searchTerm
    ) {
      nodes {
        id
        name
        description
        imagePaths
        isVisible
        address
        seasons
        topographic
        activities
        province {
          name
        }
        comments {
          edges {
            node {
              comment
              createdAt
              account {
                name
              }
            }
          }
        }
        coordinate {
          coordinates
        }
      }
    }
  }
`;

export const LOAD_DESTINATION_TRENDING = gql`
  query {
    trendingDestinations {
      destinations {
        id
        name
        planCount
      }
      from
      to
    }
  }
`;

export const ADD_DESTINATION = gql`
  mutation createDestination($dto: DestinationCreateInput!) {
    createDestination(dto: $dto) {
      id
    }
  }
`;

export const UDPATE_DESTINATION = gql`
  mutation updateDestination($dto: DestinationUpdateInput!) {
    updateDestination(dto: $dto) {
      id
    }
  }
`;

export const LOAD_PROVINCES = gql`
  {
    provinces(first: 100) {
      nodes {
        id
        name
      }
    }
  }
`;

export const IMPORT_EXCEL_DESTINATION = gql`
  mutation createMultiDestination($input: [DestinationCreateInput!]!) {
    createMultiDestination(dtos: $input) {
      id
      name
    }
  }
`;

export const CHANGE_STATUS_DESTINATION = gql`
  mutation changeStatusDes($id: Int!) {
    changeDestinationStatus(destinationId: $id) {
      id
      name
    }
  }
`;
