import { Sock } from "../types";
import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";
import IWebMessageInfo = proto.IWebMessageInfo;
import axios, { AxiosResponse } from "axios";

export const quote = async (
  sock: Sock,
  msg: IWebMessageInfo
): Promise<void> => {
  const { data }: AxiosResponse = await axios.get(
    "https://api.quotable.io/random"
  );

  const msgToSend: AnyMessageContent = {
    text: `"${data.content}"
- ${data.author}`,
  };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
};
