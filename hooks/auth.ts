import { useSetRecoilState } from "recoil";
import { AuthError } from "../lib/errors";
import { userIdState } from "../state/user";

interface Auth {
  logIn(email: string, password: string): Promise<void>;
  logOut(): Promise<void>;
  register(email: string, password: string): Promise<void>;
}

export const useAuth = (): Auth => {
  const setUserId = useSetRecoilState(userIdState);

  return {
    logIn: async (email: string, password: string) => {
      if (!userExists(email)) {
        throw new AuthError("Bad email or password");
      }
      setUserId(userDb[email]);
    },
    logOut: async () => {
      setUserId(null);
    },
    register: async (email: string, password: string) => {
      if (userExists(email)) {
        throw new AuthError("User already exists");
      }
      const userId = `${Object.keys(userDb).length + 1}`;
      userDb[email] = userId;
      setUserId(userId);
    },
  };
};

const userExists = (email: string): boolean => Object.hasOwn(userDb, email);

const userDb: Record<string, string> = {
  "scott@scott.com": "1",
  "bob@bob.com": "2",
  "allison@allision.com": "3",
};
