import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { SummaryCard } from '../../_components/SummaryCard';
import { cn } from '@/lib/utils';
import { SummaryData } from '@/types/transactions';

interface TransactionSummaryProps {
  data: SummaryData;
}

export const TransactionSummary = ({ data }: TransactionSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Income"
        value={data?.totalIncome}
        icon={
          <ArrowUpCircle className={cn(
            "h-5 w-5",
            "text-emerald-500 dark:text-emerald-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName="text-emerald-500 dark:text-emerald-400"
        className="group"
      />
      <SummaryCard
        title="Total Expenses"
        value={data?.totalExpenses}
        icon={
          <ArrowDownCircle className={cn(
            "h-5 w-5",
            "text-rose-500 dark:text-rose-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName="text-rose-500 dark:text-rose-400"
        className="group"
      />
      <SummaryCard
        title="Current Balance"
        value={data?.balance}
        icon={
          <Wallet className={cn(
            "h-5 w-5",
            "text-blue-500 dark:text-blue-400",
            "transform transition-transform group-hover:scale-110"
          )} />
        }
        valueClassName={cn(
          data?.balance >= 0 
            ? "text-emerald-500 dark:text-emerald-400" 
            : "text-rose-500 dark:text-rose-400"
        )}
        className="group"
      />
    </div>
  );
};