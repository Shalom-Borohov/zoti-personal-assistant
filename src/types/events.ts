import {
  AuthenticationCreds,
  BaileysEventMap,
  MessageUpsertType,
  WAMessage,
} from "@adiwajshing/baileys";

export interface Events extends Partial<BaileysEventMap<AuthenticationCreds>> {}

export interface Upsert {
  messages: WAMessage[];
  type: MessageUpsertType;
}
