import { differenceInDays, parseISO } from "date-fns";

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
  const baseDate = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    value += (Math.random() - 0.45) * (value * 0.02);
    data.push({
      date: date.toISOString().split("T")[0], // Store as YYYY-MM-DD
      value: Math.round(value),
    });
  }
  return data;
};

const allTimeDataPoints = generateDateRange(365 * 3, 50000);
const last12MonthsDataPoints = allTimeDataPoints.slice(-365);
const last30DaysDataPoints = allTimeDataPoints.slice(-30);

const formatDataForDisplay = (data: { date: string; value: number }[]) => {
  return data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));
};

const dataSets: Record<Period, PortfolioData> = {
  "all-time": {
    portfolioHistory: formatDataForDisplay(allTimeDataPoints),
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
    portfolioHistory: formatDataForDisplay(last12MonthsDataPoints),
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
    portfolioHistory: formatDataForDisplay(last30DaysDataPoints),
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

export const getPortfolioData = async (options: {
  period?: Period;
  from?: string;
  to?: string;
}): Promise<PortfolioData> => {
  const { period = "all-time", from, to } = options;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (from && to) {
    const fromDate = parseISO(from);
    const toDate = parseISO(to);
    
    const filteredHistory = allTimeDataPoints.filter(d => {
      const pointDate = parseISO(d.date);
      return pointDate >= fromDate && pointDate <= toDate;
    });

    // Create a copy of a default dataset and replace the history
    const customData = JSON.parse(JSON.stringify(dataSets["all-time"]));
    customData.portfolioHistory = formatDataForDisplay(filteredHistory);
    
    if (filteredHistory.length > 1) {
      const firstValue = filteredHistory[0].value;
      const lastValue = filteredHistory[filteredHistory.length - 1].value;
      const change = ((lastValue - firstValue) / firstValue) * 100;
      customData.keyMetrics.change = parseFloat(change.toFixed(2));
      customData.keyMetrics.changeType = change >= 0 ? 'increase' : 'decrease';
      customData.keyMetrics.totalValue = lastValue;
      customData.keyMetrics.totalGain = lastValue - firstValue;
    } else if (filteredHistory.length === 1) {
      customData.keyMetrics.totalValue = filteredHistory[0].value;
      customData.keyMetrics.change = 0;
      customData.keyMetrics.totalGain = 0;
    } else {
       customData.keyMetrics.totalValue = 0;
       customData.keyMetrics.change = 0;
       customData.keyMetrics.totalGain = 0;
       customData.keyMetrics.ytdGain = 0;
       customData.keyMetrics.lastMonthGain = 0;
    }

    return customData;
  }

  return dataSets[period];
};
