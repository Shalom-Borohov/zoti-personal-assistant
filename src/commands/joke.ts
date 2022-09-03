import { Sock } from "../types";
import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";
import IWebMessageInfo = proto.IWebMessageInfo;
import axios, { AxiosResponse } from "axios";

const tellATwoPartJoke = async (
  sock: Sock,
  msg: IWebMessageInfo,
  setup: string,
  delivery: string
): Promise<void> => {
  const setupToSend: AnyMessageContent = { text: setup };
  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, setupToSend, msg.key.remoteJid!);

  const deliveryToSend: AnyMessageContent = { text: delivery };
  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, deliveryToSend, msg.key.remoteJid!);
};
const tellAOnePartJoke = async (
  sock: Sock,
  msg: IWebMessageInfo,
  joke: string
): Promise<void> => {
  const msgToSend: AnyMessageContent = { text: joke };
  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, msg.key.remoteJid!);
};

export const joke = async (sock: Sock, msg: IWebMessageInfo): Promise<void> => {
  const { data }: AxiosResponse = await axios.get(
    "https://v2.jokeapi.dev/joke/Any"
  );

  data.type === "twopart"
    ? tellATwoPartJoke(sock, msg, data.setup, data.delivery)
    : tellAOnePartJoke(sock, msg, data.joke);
};
