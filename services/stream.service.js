import { StreamClient } from "@stream-io/node-sdk";

export function getStreamClient() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing in environment variables!");
  }

  return new StreamClient(apiKey, apiSecret);
}

export function generateStreamToken(userId) {
  const client = getStreamClient();
  return client.createToken(userId);
}
