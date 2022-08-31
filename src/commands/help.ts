import { Sock } from "../types";
import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import IWebMessageInfo = proto.IWebMessageInfo;
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";

export const help = async (
  sock: Sock,
  words: string[],
  msg: IWebMessageInfo
) => {
  const msgToSend: AnyMessageContent = {
    text: `בחרו את המספר עליו תרצו שאסביר: 
    1. טיימר ⏲️`,
  };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
};

export const explain = async (
  sock: Sock,
  words: string[],
  msg: IWebMessageInfo
) => {
  const optionsExplanation: Record<number, string> = {
    1: `
  הקלד "טיימר" ולאחריו מספר דקות ובסופו אזכיר לך שהסתיים
  לדוגמה: "טיימר 10"
  `,
  };

  // const msgToSend: AnyMessageContent = {};

  // await sock!.readMessages([msg.key]);
  // await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
};
