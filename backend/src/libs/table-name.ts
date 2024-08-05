const isDev = process.env.NEXT_PUBLIC_ENV || ""

export const SITUATION_TABLE = isDev ? "dev_situations" : "situations"
export const USER_TABLE = "users"
export const SUBSCRIPTION_TABLE = isDev ? "dev_subscriptions" : "subscriptions"
export const SETTING_TABLE = isDev ? "dev_settings" : "settings"
