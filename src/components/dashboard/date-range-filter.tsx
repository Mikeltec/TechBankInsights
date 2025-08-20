"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Period } from "@/lib/data";

interface DateRangeFilterProps {
  defaultPeriod: Period;
}

export default function DateRangeFilter({ defaultPeriod }: DateRangeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("period", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultPeriod}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
        <SelectItem value="last-12-months">Last 12 Months</SelectItem>
        <SelectItem value="all-time">All Time</SelectItem>
      </SelectContent>
    </Select>
  );
}
