import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  MessageRetryMap,
  useMultiFileAuthState,
} from "@adiwajshing/baileys";
import MAIN_LOGGER from "./MAIN_LOGGER";

const logger = MAIN_LOGGER.child({});
logger.level = "trace";
const useStore = !process.argv.includes("--no-store");
const doReplies = !process.argv.includes("--no-reply");

// external map to store retry counts of messages when decryption/encryption fails
// keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts
const msgRetryCounterMap: MessageRetryMap = {};

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = useStore ? makeInMemoryStore({ logger }) : undefined;
store?.readFromFile("./baileys_store_multi.json");
// save every 10s
setInterval(() => {
  store?.writeToFile("./baileys_store_multi.json");
}, 10_000);

// start a connection
const startSock = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("baileys_auth_info");
  // fetch latest version of WA Web
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: true,
    auth: state,
    msgRetryCounterMap,
    // implement to handle retries
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid!, key.id!, undefined);
        return msg?.message || undefined;
      }

      // only if store is present
      return { conversation: "hello" };
    },
  });

  store?.bind(sock.ev);

  // the process function lets you process all events that just occurred
  // efficiently in a batch
  sock.ev.process(
    // events is a map for event name => event data
    async (events) => {
      // something about the connection changed
      // maybe it closed, or we received all offline message or connection opened
      if (events["connection.update"]) {
        const update = events["connection.update"];
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
          // reconnect if not logged out
          if (
            (lastDisconnect?.error as Boom)?.output?.statusCode !==
            DisconnectReason.loggedOut
          ) {
            startSock();
          } else {
            console.log("Connection closed. You are logged out.");
          }
        }

        console.log("connection update", update);
      }

      // credentials updated -- save them
      if (events["creds.update"]) {
        await saveCreds();
      }

      if (events.call) {
        console.log("recv call event", events.call);
      }

      // chat history received
      if (events["chats.set"]) {
        const { chats, isLatest } = events["chats.set"];
        console.log(`recv ${chats.length} chats (is latest: ${isLatest})`);
      }

      // message history received
      if (events["messages.set"]) {
        const { messages, isLatest } = events["messages.set"];
        console.log(
          `recv ${messages.length} messages (is latest: ${isLatest})`
        );
      }

      if (events["contacts.set"]) {
        const { contacts, isLatest } = events["contacts.set"];
        console.log(
          `recv ${contacts.length} contacts (is latest: ${isLatest})`
        );
      }

      // messages updated like status delivered, message deleted etc.
      if (events["messages.update"]) {
        console.log(events["messages.update"]);
      }

      if (events["message-receipt.update"]) {
        console.log(events["message-receipt.update"]);
      }

      if (events["messages.reaction"]) {
        console.log(events["messages.reaction"]);
      }

      if (events["presence.update"]) {
        console.log(events["presence.update"]);
      }

      if (events["chats.update"]) {
        console.log(events["chats.update"]);
      }

      if (events["chats.delete"]) {
        console.log("chats deleted ", events["chats.delete"]);
      }
    }
  );

  return sock;
};

const run = async (): Promise<void> => {
  const sock = await startSock();
};

run();
