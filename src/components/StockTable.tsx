import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubClient";
import type { Quote } from "finnhub-ts";

interface StockTableProps {
  symbols: string[];
}

interface StockData {
  symbol: string;
  quote: Quote;
}

type SortField = "symbol" | "price" | "change" | "changePercent";
type SortDirection = "asc" | "desc";

export default function StockTable({ symbols }: StockTableProps) {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortFunctions = {
    symbol: (a: StockData, b: StockData) => a.symbol.localeCompare(b.symbol),
    price: (a: StockData, b: StockData) => (a.quote.c ?? 0) - (b.quote.c ?? 0),
    change: (a: StockData, b: StockData) => (a.quote.d ?? 0) - (b.quote.d ?? 0),
    changePercent: (a: StockData, b: StockData) =>
      (a.quote.dp ?? 0) - (b.quote.dp ?? 0),
  };

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        symbols.map(async (symbol) => ({
          symbol,
          quote: await getQuote(symbol),
        }))
      );
      setStocks(results);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbols]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedStocks = stocks
    .filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = sortFunctions[sortField](a, b);
      return sortDirection === "asc" ? comparison : -comparison;
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-gray-600">Fetching stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => {
            fetchStockData();
          }}
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search symbols..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th
                className="cursor-pointer p-4 text-left font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => handleSort("symbol")}
              >
                Symbol{" "}
                {sortField === "symbol"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </th>
              <th
                className="cursor-pointer p-4 text-left font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => handleSort("price")}
              >
                Current Price{" "}
                {sortField === "price"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </th>
              <th
                className="cursor-pointer p-4 text-left font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => handleSort("change")}
              >
                Change{" "}
                {sortField === "change"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </th>
              <th
                className="cursor-pointer p-4 text-left font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => handleSort("changePercent")}
              >
                Change %{" "}
                {sortField === "changePercent"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStocks.map((stock) => (
              <tr key={stock.symbol} className="border-b last:border-0">
                <td className="p-4 font-medium">{stock.symbol}</td>
                <td className="p-4">${stock.quote.c?.toFixed(2) ?? "N/A"}</td>
                <td className="p-4">
                  <span
                    className={
                      (stock.quote.d ?? 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {(stock.quote.d ?? 0) >= 0 ? "+" : ""}$
                    {stock.quote.d?.toFixed(2) ?? "N/A"}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={
                      (stock.quote.dp ?? 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {(stock.quote.dp ?? 0) >= 0 ? "+" : ""}
                    {stock.quote.dp?.toFixed(2) ?? "N/A"}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
