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
          comment
          createdAt
          account {
            name
          }
        }
      }
    }
  }
`;

export const LOAD_DESTINATIONS = gql`
  {
    destinations(first: 100, order: { id: ASC }) {
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
          comment
          createdAt
          account {
            name
          }
        }
      }
    }
  }
`;

export const LOAD_DESTINATIONS_FILTER = gql`
  query LoadDestinations($topo: [Topographic!]) {
    destinations(
      first: 100
      order: { id: DESC }
      where: { topographic: { in: $topo } }
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
          comment
          createdAt
          account {
            name
          }
        }
        coordinate {
          coordinates
        }
      }
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
