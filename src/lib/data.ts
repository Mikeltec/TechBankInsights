export type Period = "last-30-days" | "last-12-months" | "all-time";

type PortfolioData = {
  portfolioHistory: { date: string; value: number }[];
  assetAllocation: { name: string; value: number; color: string }[];
  keyMetrics: {
    totalValue: number;
    ytdGain: number;
    lastMonthGain: number;
    totalGain: number;
    change: number;
    changeType: "increase" | "decrease";
  };
};

const generateDateRange = (days: number, initialValue: number) => {
  const data = [];
  let value = initialValue;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value += (Math.random() - 0.45) * (value * 0.02);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Math.round(value),
    });
  }
  return data;
};

const allTimeData = generateDateRange(365 * 3, 50000);
const last12MonthsData = allTimeData.slice(-365);
const last30DaysData = allTimeData.slice(-30);

const dataSets: Record<Period, PortfolioData> = {
  "all-time": {
    portfolioHistory: allTimeData,
    assetAllocation: [
      { name: "Stocks", value: 45000, color: "hsl(var(--chart-1))" },
      { name: "Bonds", value: 25000, color: "hsl(var(--chart-2))" },
      { name: "Real Estate", value: 15000, color: "hsl(var(--chart-3))" },
      { name: "Crypto", value: 10000, color: "hsl(var(--chart-4))" },
      { name: "Cash", value: 5000, color: "hsl(var(--chart-5))" },
    ],
    keyMetrics: {
      totalValue: 125320,
      ytdGain: 15230,
      lastMonthGain: -1240,
      totalGain: 75320,
      change: 0.8,
      changeType: "increase",
    },
  },
  "last-12-months": {
    portfolioHistory: last12MonthsData,
    assetAllocation: [
      { name: "Stocks", value: 65000, color: "hsl(var(--chart-1))" },
      { name: "Bonds", value: 35000, color: "hsl(var(--chart-2))" },
      { name: "Real Estate", value: 18000, color: "hsl(var(--chart-3))" },
      { name: "Crypto", value: 5000, color: "hsl(var(--chart-4))" },
      { name: "Cash", value: 2320, color: "hsl(var(--chart-5))" },
    ],
    keyMetrics: {
      totalValue: 125320,
      ytdGain: 15230,
      lastMonthGain: -1240,
      totalGain: 25320,
      change: 1.2,
      changeType: "increase",
    },
  },
  "last-30-days": {
    portfolioHistory: last30DaysData,
    assetAllocation: [
      { name: "Stocks", value: 68000, color: "hsl(var(--chart-1))" },
      { name: "Bonds", value: 34000, color: "hsl(var(--chart-2))" },
      { name: "Real Estate", value: 17500, color: "hsl(var(--chart-3))" },
      { name: "Crypto", value: 4580, color: "hsl(var(--chart-4))" },
      { name: "Cash", value: 1240, color: "hsl(var(--chart-5))" },
    ],
    keyMetrics: {
      totalValue: 125320,
      ytdGain: 15230,
      lastMonthGain: -1240,
      totalGain: 1240,
      change: -2.1,
      changeType: "decrease",
    },
  },
};

export const getPortfolioData = async (
  period: Period = "all-time"
): Promise<PortfolioData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dataSets[period];
};
