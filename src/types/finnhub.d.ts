declare module "finnhub" {
  export interface QuoteData {
    c: number; // Current price
    d: number; // Change
    dp: number; // Percent change
    h: number; // High price of the day
    l: number; // Low price of the day
    o: number; // Open price of the day
    pc: number; // Previous close price
  }

  export class Client {
    constructor(apiKey: string);
    quote(
      symbol: string,
      callback: (error: any, data: QuoteData) => void
    ): void;
  }
}
