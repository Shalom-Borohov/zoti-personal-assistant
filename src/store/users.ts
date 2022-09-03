import { User } from "../types/user";
import { proto } from "@adiwajshing/baileys";
import IMessageKey = proto.IMessageKey;

const users: Record<string, User> = {};
let currUserMsgKey: IMessageKey;

export const addUser = (id: string): void => {
  users[id] = { id, isHelpMode: false };
};

export const putUserInHelpMode = (id: string): void => {
  users[id].isHelpMode = true;
};

export const putUserOutOfHelpMode = (id: string): void => {
  users[id].isHelpMode = false;
};

export const isUserExists = (id: string): boolean => !!users[id];

export const isUserInHelpMode = (id: string): boolean => users[id].isHelpMode;

export const setCurrUserMsgKey = (key: IMessageKey): void => {
  currUserMsgKey = key;
};

export const getCurrUserMsgKey = (): IMessageKey => {
  return currUserMsgKey;
};
