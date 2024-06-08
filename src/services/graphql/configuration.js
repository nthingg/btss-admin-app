import { gql } from "@apollo/client";

export const LOAD_SYSTEM_CONFIGURATIONS = gql`
    query {
        configurations {
            USE_FIXED_OTP
            DEFAULT_PRESTIGE_POINT
            MIN_TOPUP
            MAX_TOPUP
            HOLIDAY_MEAL_UP_PCT
            HOLIDAY_LODGING_UP_PCT
            HOLIDAY_RIDING_UP_PCT
            ORDER_PROCESSING_DATE_DURATION
            MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT
            ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT
            ORDER_REFUND_CUSTOMER_CANCEL_2_DAY_PCT
            PRODUCT_MAX_PRICE_UP_PCT
            PLAN_COMPLETE_AFTER_DAYS
            ORDER_COMPLETE_AFTER_DAYS
            MIN_PLAN_MEMBER
            MAX_PLAN_MEMBER
            MIN_DEPART_DIFF
            MAX_DEPART_DIFF
            MIN_PERIOD
            MAX_PERIOD
            BUDGET_ASSURANCE_RATE
            HOLIDAYS {
                name
                from
                to
            }
        }
    }
`
export const UPDATE_SYSTEM_CONFIGURATIONS = gql`
    mutation updateConfig($input: AppConfigInput!) {
        updateConfig(dto: $input)
    }
`
