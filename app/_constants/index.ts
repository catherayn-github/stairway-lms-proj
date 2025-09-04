export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;
export const THREE = 3;
export const FOUR = 4;
export const FIVE = 5;
export const SIX = 6;
export const SEVEN = 7;
export const EIGHT = 8;
export const SECONDS_PER_MONTH = 2592000;
export const THOUSAND = 1000;
export const INVALID_SESSION_TOKEN = "INVALID_SESSION_TOKEN";
export const USER_NOT_PERMITTED_ERROR = "USER_NOT_PERMITTED_ERROR";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";

export const TIMEOUT_SPEED = {
    slowest: 5000,
    slower: 3000,
    slow: 2000,
    normal: 1000,
    fast: 500,
    faster: 350,
    fastest: 150,
} as const;

export const REGEX = {
    phone_number_formatted: /^\(\d{3}\) \d{3}-\d{4}$/,
} as const;
