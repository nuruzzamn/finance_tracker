import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { SummaryCard } from '../../_components/SummaryCard';
import { cn } from '@/lib/utils';

export const TransactionSummary = () => {
  const summary = {
    totalIncome: 5000,
    totalExpenses: 3000,
    balance: 2000,
    trends: {
      income: { value: 12, isPositive: true },
      expenses: { value: 8, isPositive: false },
      balance: { value: 15, isPositive: true }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Income"
        value={summary.totalIncome}
        icon={
          <ArrowUpCircle className={cn(
            "h-5 w-5",
            "text-emerald-500 dark:text-emerald-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName="text-emerald-500 dark:text-emerald-400"
        trend={summary.trends.income}
        className="group"
      />
      <SummaryCard
        title="Total Expenses"
        value={summary.totalExpenses}
        icon={
          <ArrowDownCircle className={cn(
            "h-5 w-5",
            "text-rose-500 dark:text-rose-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName="text-rose-500 dark:text-rose-400"
        trend={summary.trends.expenses}
        className="group"
      />
      <SummaryCard
        title="Current Balance"
        value={summary.balance}
        icon={
          <Wallet className={cn(
            "h-5 w-5",
            "text-blue-500 dark:text-blue-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName={cn(
          summary.balance >= 0 
            ? "text-emerald-500 dark:text-emerald-400" 
            : "text-rose-500 dark:text-rose-400"
        )}
        trend={summary.trends.balance}
        className="group"
      />
    </div>
  );
};