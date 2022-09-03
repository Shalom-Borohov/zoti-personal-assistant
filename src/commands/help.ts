import { Sock } from "../types";
import { AnyMessageContent, proto } from "@adiwajshing/baileys";
import IWebMessageInfo = proto.IWebMessageInfo;
import { sendMessageWTyping } from "../Misc/send-msg-with-typing";
import { putUserInHelpMode, putUserOutOfHelpMode } from "../store/users";
import { isDefined } from "../utils/guards/type-guards";

export const help = async (sock: Sock, msg: IWebMessageInfo) => {
  const id: string | null | undefined = msg?.key?.remoteJid;
  if (!isDefined(id)) return;

  const msgToSend: AnyMessageContent = {
    text: `בחרו את המספר עליו תרצו שאסביר: 
1. ⏲️ טיימר
2. 🤣 בדיחה
3. 🗣 ציטוט
4. ❓ עובדה`,
  };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, id);
  putUserInHelpMode(id);
};

export const explain = async (
  sock: Sock,
  command: string,
  msg: IWebMessageInfo
) => {
  const id: string | null | undefined = msg?.key?.remoteJid;
  if (!isDefined(id)) return;

  const optionsExplanation: Record<number, string> = {
    1: ` הקלד טיימר ולאחריו מספר דקות
לדוגמה: טיימר 10`,
    2: `הקלד משהו שמכיל את המילה בדיחה או מצחיק ואשלח בדיחה
לדוגמה: שלחי לי משהו מצחיק`,
    3: `הקלד משהו שמכיל את המילה ציטוט ואשלח ציטוט
לדוגמה: איך בא לי איזה ציטוט טוב ככה`,
    4: `הקלד משהו שמכיל את המילה עובדה ואשלח עובדה
לדוגמה: תראי לי איזו שהיא עובדה מעניינת`,
  };

  const msgToSend: AnyMessageContent = {
    text: optionsExplanation[+command] ?? "",
  };

  await sock!.readMessages([msg.key]);
  await sendMessageWTyping(sock, msgToSend, id);
  putUserOutOfHelpMode(id);
};
