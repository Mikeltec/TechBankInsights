import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
}: StatCardProps) {
  const isIncrease = changeType === "increase";
  const changeColor = isIncrease ? "text-green-500" : "text-red-500";
  const ChangeIcon = isIncrease ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor} flex items-center`}>
          <ChangeIcon className="h-4 w-4 mr-1" />
          {isIncrease ? "+" : ""}
          {change.toFixed(1)}% from last period
        </p>
      </CardContent>
    </Card>
  );
}
