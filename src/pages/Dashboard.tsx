import StockTable from "../components/StockTable";

export default function Dashboard() {
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "META"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stock Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time stock prices for top tech companies
        </p>
      </div>
      <StockTable symbols={symbols} />
    </div>
  );
}
