/* ENTITIES */
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { User } from "./user.interface";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      access_token: string;
      refresh_token: string;
      access_token_expiration: number;
      refresh_token_expiration: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    access_token: string;
    refresh_token: string;
    access_token_expiration: number;
    refresh_token_expiration: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    access_token: string;
    refresh_token: string;
    access_token_expiration: number;
    refresh_token_expiration: number;
  }
}

export interface DecodedJWT {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  exp: number;
  iat: number;
  jti: string;
}

export interface LoginResponse {
  user: User;
  access_token: "test_access_token";
  refresh_token: "test_refresh_token";
}
