import { DaprClient } from '@dapr/dapr';
import express from 'express';
import bodyParser from 'body-parser';

const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3500";
const PUBSUB_NAME = "compressionpubsub";
const PUBSUB_VALIDATE = "validate";
const PUBSUB_DECOMPRESS = "decompress";

async function main() {
  const app = express()
  const port = 3000
  
  app.use(bodyParser.json());
  
  const client = new DaprClient(DAPR_HOST, DAPR_HTTP_PORT);

  app.post('/compress', async (req, res) => {
    const text = req.body.text;
    console.log("Text received: " + text)
    await client.pubsub.publish(PUBSUB_NAME, PUBSUB_VALIDATE, text);
    res.status(200).json("Text sent successfully to validator");
  })
  
  app.post('/decompress', async (req, res) => {
    const text = req.body.text;
    console.log("Compressed text received: " + text)
    await client.pubsub.publish(PUBSUB_NAME, PUBSUB_DECOMPRESS, text);
    res.status(200).json("Text sent successfully to decompressor");
  })
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

main().catch(e => console.error(e))
