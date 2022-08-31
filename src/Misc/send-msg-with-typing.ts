import { Sock } from "../types";
import { AnyMessageContent, delay } from "@adiwajshing/baileys";

export const sendMessageWTyping = async (
  sock: Sock,
  msg: AnyMessageContent,
  jid: string
) => {
  await sock.presenceSubscribe(jid);
  await delay(500);

  await sock.sendPresenceUpdate("composing", jid);
  await delay(2000);

  await sock.sendPresenceUpdate("paused", jid);

  await sock.sendMessage(jid, msg);
};
