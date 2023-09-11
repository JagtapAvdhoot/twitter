import { compareSync, hashSync } from "bcrypt";

export const comparePassword = (input: string, hash: string) => {
  return compareSync(input, hash);
};
export const hashPassword = (input: string) => {
  return hashSync(input, 12);
};
