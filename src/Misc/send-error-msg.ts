import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import { sendMessageWTyping } from "./send-msg-with-typing";
import { Sock } from "../types";
import IMessageKey = proto.IMessageKey;

export const sendErrorMsg = async (
  sock: Sock,
  key: IMessageKey
): Promise<void> => {
  const msgToSend: AnyMessageContent = {
    text: "מצטערת קרתה שגיאה, אתה מוזמן לנסות שוב",
  };

  await sock!.readMessages([key]);
  await sendMessageWTyping(sock, msgToSend, key.remoteJid!);
};
