import { startSock } from "./sock";
import { Sock } from "./types";
import { sendErrorMsg } from "./Misc/send-error-msg";
import { getCurrUserMsgKey } from "./store/users";
require("dotenv").config();
let sock: Sock;

startSock().then((s: Sock) => (sock = s));

process.on("uncaughtException", (err: Error): void => {
  console.error(JSON.stringify(err));
  sendErrorMsg(sock, getCurrUserMsgKey());
});
