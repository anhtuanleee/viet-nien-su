import HistoricalAtlas from "./components/HistoricalAtlas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period } = await searchParams;
  return <HistoricalAtlas initialPeriodId={period} />;
}
