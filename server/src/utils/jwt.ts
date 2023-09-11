import { decode, sign, verify } from "jsonwebtoken";

export type TPayload = Record<string, any> | string;

export function signJWT(payload: TPayload) {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export function decodeJWT(token: string) {
  return decode(token);
}

export function verifyJWT(token: string) {
  return verify(token, process.env.JWT_SECRET!);
}
