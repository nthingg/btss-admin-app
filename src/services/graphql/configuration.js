import { gql } from "@apollo/client";

export const LOAD_SYSTEM_CONFIGURATIONS = gql`
    query {
        configurations {
        BUDGET_ASSURED_PCT
        DEFAULT_PRESTIGE_POINT
        HOLIDAY_LODGING_UP_PCT
        HOLIDAY_MEAL_UP_PCT
        HOLIDAY_RIDING_UP_PCT
        HOLIDAYS {
            name
            from
            to
        }
        MAX_TOPUP
        MIN_TOPUP
        ORDER_DATE_MIN_DIFF
        USE_FIXED_OTP
        ORDER_CANCEL_DATE_DURATION
        MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT
        ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT
        PRODUCT_MAX_PRICE_UP_PCT
        LAST_MODIFIED
        }
    }
`
export const UPDATE_SYSTEM_CONFIGURATIONS = gql`
    mutation updateConfig($input: AppConfigInput!) {
        updateConfig(dto: $input)
    }
`
