const UserAPIRoot: URL = new URL("user/", process.env.NEXT_PUBLIC_API_URL);

export enum UserAPIEnum {
  LOGIN = "login/",
  LOGOUT = "logout/",
}

export default UserAPIRoot;
