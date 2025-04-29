/// <reference path="../types/finnhub.d.ts" />

import { DefaultApi } from "finnhub-ts";

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const finnhubClient = new DefaultApi({
  apiKey: API_KEY,
  isJsonMime: (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  },
});

export async function getQuote(symbol: string) {
  if (!API_KEY) {
    throw new Error(
      "Finnhub API key is not configured. Please check your .env file."
    );
  }

  try {
    const response = await finnhubClient.quote(symbol);
    return response.data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
}
