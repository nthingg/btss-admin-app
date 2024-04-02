import { gql } from "@apollo/client";

export const GEN_MEM_SIMULATOR = gql`
  {
    accounts(where: { name: { startsWith: "test-account" } }) {
      nodes {
        id
        name
        phone
      }
    }
  }
`;

export const REQUEST_OTP_SIMULATOR = gql`
  mutation requestOTP($dto: TravelerRequestOTPInput!) {
    travelerRequestOTP(dto: $dto)
  }
`;

export const REQUEST_AUTH_SIMULATOR = gql`
  mutation auth($dto: TravelerAuthInput!) {
    travelerRequestAuthorize(dto: $dto) {
      accessToken
      refreshToken
    }
  }
`;

export const JOIN_PLAN_SIMULATOR = gql`
  mutation joinPlanSimulator($dto: PlanJoinInput!) {
    joinPlan(dto: $dto) {
      id
    }
  }
`;

export const CANCEL_PLAN_SIMULATOR = gql`
  mutation cancelPlanSimulator($id: Int!) {
    cancelPlan(planId: $id) {
      id
    }
  }
`;

export const LOAD_PLANS_SIMULATOR = gql`
  query LoadPlans($id: Int!) {
    plans(
      first: 20
      order: { id: DESC }
      where: { account: { id: { eq: $id } } }
    ) {
      nodes {
        id
        name
        account {
          name
        }
        members {
          id
          status
          account {
            name
          }
        }
        status
        memberCount
        maxMemberCount
        joinMethod
      }
    }
  }
`;

export const LOAD_PLANS_BY_ID_SIMULATOR = gql`
  query LoadPlans($id: Int!) {
    plans(first: 20, order: { id: DESC }, where: { id: { eq: $id } }) {
      nodes {
        id
        name
        account {
          name
        }
        members {
          id
          status
          account {
            name
          }
        }
        status
        memberCount
        maxMemberCount
        joinMethod
      }
    }
  }
`;

export const CREATE_PLAN_SIMULATOR = gql`
  mutation createPlan($dto: PlanCreateInput!) {
    createPlan(dto: $dto) {
      id
    }
  }
`;

export const CHANGE_JOIN_METHOD_SIMULATOR = gql`
  mutation updateJoinMethodSimulator($dto: JoinMethodUpdateInput!) {
    updateJoinMethod(dto: $dto) {
      id
      name
      joinMethod
    }
  }
`;

export const CONFIRM_PLAN_SIMULATOR = gql`
  mutation confirmMembers($dto: Int!) {
    confirmMembers(planId: $dto) {
      id
      name
    }
  }
`;

export const LOAD_REGISTERING_PLANS_SIMULATOR = gql`
  query plan($id: Int!) {
    plans(
      first: 10
      where: { accountId: { eq: $id }, status: { eq: REGISTERING } }
    ) {
      nodes {
        id
      }
    }
  }
`;

export const ORDER_CREATE_SIMULATOR = gql`
  mutation createNewOrder($dto: OrderCreateInput!) {
    createOrder(dto: $dto) {
      type
    }
  }
`;

export const INVITE_PLANS_SIMULATOR = gql`
  mutation inviteToPlan($dto: PlanInviteInput!) {
    inviteToPlan(dto: $dto) {
      id
    }
  }
`;

export const SET_TIME_SIMULATOR = gql`
  mutation setTime($time: DateTime!) {
    setSystemDateTime(dateTime: $time)
  }
`;

export const RESET_TIME_SIMULATOR = gql`
  mutation resetTime {
    resetSystemDateTime
  }
`;

export const VERIFY_PLAN_SIMULATOR = gql`
  mutation checkinPlanSimulator($dto: PlanVerifyInput!) {
    checkinPlan(dto: $dto) {
      id
    }
  }
`;
