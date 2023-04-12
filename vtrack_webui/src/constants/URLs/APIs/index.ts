import UserAPIRoot, { UserAPIEnum } from "./user";

/**
 * User APIs
 */
export const USER_LOGIN_API: URL = new URL(UserAPIEnum.LOGIN, UserAPIRoot);
export const USER_LOGOUT_API: URL = new URL(UserAPIEnum.LOGOUT, UserAPIRoot);
