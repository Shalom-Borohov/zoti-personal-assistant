import { User } from "../types/user";

const users: Record<string, User> = {};

export const addUser = (id: string): void => {
  users[id] = { id, isHelpMode: false };
};

export const putUserInHelpMode = (id: string): void => {
  users[id].isHelpMode = true;
};

export const putUserOutOfHelpMode = (id: string): void => {
  users[id].isHelpMode = false;
};

export const isUserExists = (id: string): boolean => {
  return !!users[id];
};

export const isUserInHelpMode = (id: string): boolean => {
  return users[id].isHelpMode;
};
