import { Sock } from "../types";
import axios, { AxiosResponse } from "axios";
import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import IWebMessageInfo = proto.IWebMessageInfo;
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";
import { isDefined } from "../utils/guards/type-guards";

export const fact = async (sock: Sock, msg: IWebMessageInfo): Promise<void> => {
  const apiKey: string | undefined = process.env.API_NINJAS_KEY;
  if (!isDefined(apiKey)) return;

  const { data }: AxiosResponse = await axios.get(
    "https://api.api-ninjas.com/v1/facts",
    { headers: { "X-Api-Key": apiKey } }
  );

  const msgToSend: AnyMessageContent = { text: data[0].fact };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
};
