import { AnyMessageContent, delay } from "@adiwajshing/baileys";
import { Events, Sock } from "../../types";
import { Upsert } from "../../types/events";
import { isDefined } from "../../utils/guards/type-guards";

const sendMessageWTyping = async (
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

export const upsert = async (
  sock: Sock,
  events: Events,
  doReplies: boolean
): Promise<void> => {
  const upsert: Upsert | undefined = events["messages.upsert"];
  if (!isDefined(upsert)) return;

  console.log("recv messages ", JSON.stringify(upsert, undefined, 2));

  if (upsert.type === "notify") {
    for (const msg of upsert.messages) {
      if (!msg.key.fromMe && doReplies) {
        console.log("replying to", msg.key.remoteJid);

        const msgToSend: AnyMessageContent = { text: "Hello there!" };
        await sock!.readMessages([msg.key]);
        await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
      }
    }
  }
};
