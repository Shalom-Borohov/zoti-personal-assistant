import { AnyMessageContent } from "@adiwajshing/baileys";
import { Events, Sock } from "../../types";
import { Upsert } from "../../types/events";
import { isDefined } from "../../utils/guards/type-guards";
import { split } from "lodash/fp";
import { sendMessageWTyping } from "../../Misc/send-msg-with-typing";
import { setTimer, help } from "../../commands";
import { addUser, isUserExists, isUserInHelpMode } from "../../store/users";
import { explain } from "../../commands/help";

export const upsertMessages = async (
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
        const conv: string | null | undefined = msg?.message?.conversation;
        const id: string | null | undefined = msg.key.remoteJid;
        if (!isDefined(conv) || !isDefined(id)) return;

        const words: string[] = split(" ", conv);
        const command: string = words[0];

        !isUserExists(id) && addUser(id);

        if (isUserInHelpMode(id)) {
          explain(sock, command, msg);
        } else if (command === "טיימר") {
          setTimer(sock, words, msg);
        } else if (command === "עזרה") {
          help(sock, msg);
        } else {
          console.log("replying to", msg.key.remoteJid);

          const msgToSend: AnyMessageContent = {
            text: "לא הבנתי מה אתה רוצה לעשות, לעזרה הקלד עזרה",
          };
          await sock!.readMessages([msg.key]);
          await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
        }
      }
    }
  }
};
