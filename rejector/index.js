import { DaprServer } from '@dapr/dapr';

const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3504";
const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.APP_PORT || 5003;
const PUBSUB_NAME = "compressionpubsub";
const PUBSUB_REJECT = "RECHAZO";

async function main() {
  const server = new DaprServer(SERVER_HOST, SERVER_PORT, DAPR_HOST, DAPR_HTTP_PORT);

  // Dapr subscription routes orders topic to this route
  server.pubsub.subscribe(PUBSUB_NAME, PUBSUB_REJECT, (data) => {
    console.log("Se rechazo la solicitud por escribir un token prohibido: " + data);
    return;
  });

  await server.start();
}

main().catch(e => console.error(e));
