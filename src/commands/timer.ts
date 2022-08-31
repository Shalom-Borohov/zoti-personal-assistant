import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import { Sock } from "../types";
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";
import IWebMessageInfo = proto.IWebMessageInfo;

export const setTimer = async (
  sock: Sock,
  words: string[],
  msg: IWebMessageInfo
): Promise<void> => {
  const seconds: number = +words[1];
  if (isNaN(seconds)) return;

  const msgToSend: AnyMessageContent = {
    text: `מפעילה טיימר לעוד ${seconds} דקות`,
  };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);

  setTimeout(async () => {
    const msgToSend: AnyMessageContent = { text: "טיימררר" };
    await sock!.readMessages([msg.key]);
    await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
  }, seconds * 1000 * 60);
};
