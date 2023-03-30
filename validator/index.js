import { DaprServer } from '@dapr/dapr';
import { DaprClient } from '@dapr/dapr';

const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3501";
const DAPR_HTTP_CLIENT_PORT = "3505";
const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.APP_PORT || 5000;
const PUBSUB_NAME = "compressionpubsub";
const PUBSUB_VALIDATE = "validate";
const PUBSUB_COMPRESS = "compress";
const PUBSUB_REJECT = "RECHAZO";

async function main() {
  const server = new DaprServer(SERVER_HOST, SERVER_PORT, DAPR_HOST, DAPR_HTTP_PORT);

  const client = new DaprClient(DAPR_HOST, DAPR_HTTP_CLIENT_PORT);

  // Dapr subscription routes orders topic to this route
  server.pubsub.subscribe(PUBSUB_NAME, PUBSUB_VALIDATE, async (data) => {
    console.log("Text received: " + data);
    if (!data.toLowerCase().includes("ingeniero")) {
      await client.pubsub.publish(PUBSUB_NAME, PUBSUB_COMPRESS, data);
      console.log("Text accepted");
    }
    else {
      await client.pubsub.publish(PUBSUB_NAME, PUBSUB_REJECT, data);
      console.log("Text rejected");
    }
    return;
  });

  await server.start();
}

main().catch(e => console.error(e));
