import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($input: StaffAuthInput!) {
    adminRequestAuthorize(dto: $input) {
      accessToken
      refreshToken
    }
  }
`;
