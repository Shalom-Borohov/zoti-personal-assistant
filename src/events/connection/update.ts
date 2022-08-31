import { ConnectionState, DisconnectReason } from "@adiwajshing/baileys";
import { startSock } from "../../sock";
import { Boom } from "@hapi/boom";
import { Events } from "../../types";
import { isDefined } from "../../utils/guards/type-guards";

export const updateConnection = (events: Events) => {
  const update: Partial<ConnectionState> | undefined =
    events["connection.update"];
  if (!isDefined(update)) return;

  const { connection, lastDisconnect } = update;

  if (connection === "close") {
    const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;

    // reconnect if not logged out
    statusCode !== DisconnectReason.loggedOut
      ? startSock()
      : console.log("Connection closed. You are logged out.");
  }

  console.log("connection update", update);
};
