"use client"

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const COLORS = {
  Food: "#10B981",
  Salary: "#3B82F6",
  Rent: "#EC4899",
  Entertainment: "#F59E0B",
  Utilities: "#8B5CF6",
  Other: "#6B7280",
} as const;

export const CategoryChart = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  // tag: Temporary mock data 
  const transactions = [
    { category: 'Food', amount: -120 },
    { category: 'Rent', amount: -1000 },
    { category: 'Entertainment', amount: -200 },
    { category: 'Utilities', amount: -150 },
    { category: 'Other', amount: -80 },
  ];

  useEffect(() => {
    if (transactions.length > 0) {
      const expenseCategories = transactions
        .filter(t => t.amount < 0)
        .reduce((acc: Record<string, number>, transaction) => {
          const category = transaction.category;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += Math.abs(transaction.amount);
          return acc;
        }, {});

      const categoryData: CategoryData[] = Object.entries(expenseCategories).map(([name, value]) => ({
        name,
        value: value as number,
        color: COLORS[name as keyof typeof COLORS] || "#6B7280",
      }));

      setCategoryData(categoryData);
    }
  }, [transactions]);

  if (categoryData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Expense Categories
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No expense data available
          </p>
        </div>
      </div>
    );
  }

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Expense Categories
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.5rem',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};