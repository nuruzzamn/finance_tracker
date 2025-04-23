import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  valueClassName?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

export const SummaryCard = ({
  title,
  value,
  icon,
  valueClassName,
  className,
  trend,
}: SummaryCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800",
      "rounded-xl p-6",
      "border border-gray-100 dark:border-gray-700",
      "shadow-sm hover:shadow-md",
      "transform hover:-translate-y-0.5",
      "transition-all duration-200 ease-in-out",
      className
    )}>
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
          {title}
        </h3>
        <div className={cn(
          "p-2.5 rounded-full",
          "bg-gray-50 dark:bg-gray-700",
          "ring-4 ring-gray-50/50 dark:ring-gray-700/50"
        )}>
          {icon}
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-2xl font-bold tracking-tight">
          <span className={cn(
            "transition-colors duration-200",
            valueClassName
          )}>
            {value}
          </span>
        </div>
        {trend && (
          <div className="flex items-center space-x-2">
            <span className={cn(
              "flex items-center text-xs font-medium rounded-full px-2 py-0.5",
              trend.isPositive 
                ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30"
                : "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/30"
            )}>
              {trend.isPositive ? "↑" : "↓"}
              <span className="ml-1">{trend.value}%</span>
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              vs previous period
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
