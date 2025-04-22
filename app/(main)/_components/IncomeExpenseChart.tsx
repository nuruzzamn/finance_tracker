"use client"

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface Transaction {
  date: string;
  amount: number;
}

export const IncomeExpenseChart = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  //tag: Temporary mock data for transactions
  const transactions: Transaction[] = [
    { date: '2024-01-15', amount: 3000 },
    { date: '2024-01-20', amount: -1200 },
    { date: '2024-02-01', amount: 3500 },
    { date: '2024-02-15', amount: -1500 },
    { date: '2024-03-01', amount: 3200 },
    { date: '2024-03-10', amount: -900 },
  ];

  useEffect(() => {
    if (transactions.length > 0) {
      const monthlyTotals = transactions.reduce<Record<string, { income: number; expenses: number }>>(
        (acc, transaction) => {
          const date = new Date(transaction.date);
          const month = date.toLocaleString('default', { month: 'short' });
          
          if (!acc[month]) {
            acc[month] = { income: 0, expenses: 0 };
          }
          
          if (transaction.amount > 0) {
            acc[month].income += transaction.amount;
          } else {
            acc[month].expenses += Math.abs(transaction.amount);
          }
          
          return acc;
        }, 
        {}
      );
      
      const data: MonthlyData[] = Object.entries(monthlyTotals)
        .sort((a, b) => {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months.indexOf(a[0]) - months.indexOf(b[0]);
        })
        .map(([name, values]) => ({
          name,
          income: Number(values.income.toFixed(2)),
          expenses: Number(values.expenses.toFixed(2)),
        }));
      
      setMonthlyData(data);
    }
  }, [transactions]);

  const formatTooltip = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (monthlyData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Income vs Expenses
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white ">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Income vs Expenses
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 20,
              left: 50,
              bottom: 10,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:opacity-20"
            />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              className="dark:text-gray-400"
            />
            <YAxis 
              stroke="#6b7280"
              className="dark:text-gray-400"
              tickFormatter={formatTooltip}
            />
            <Tooltip
              formatter={(value: number) => [formatTooltip(value), undefined]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.5rem',
              }}
            />
            <Legend 
              formatter={(value: string) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <Bar 
              dataKey="expenses" 
              name="Expenses" 
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};