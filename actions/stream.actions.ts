"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const StreamTokenProvider = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!apiKey) {
    throw new Error("Missing Stream API Key");
  }
  if (!apiSecret) {
    throw new Error("Missing Stream API Secret");
  }
  const streamClient = new StreamClient(apiKey, apiSecret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issuedAt = Math.floor(new Date().getTime() / 1000) - 60;
  const token = streamClient.createToken(user.id, exp, issuedAt);

  return token;
};
