import React from "react";
import { CategoryChart } from "../../_components/CategoryChart";
import { IncomeExpenseChart } from "../../_components/IncomeExpenseChart";
import { baseUrl } from "@/lib/utils";

const Reports = async () => {
  const res = await fetch(`${baseUrl}/api/transactions`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch transactions');
    }
    
    const transactions = await res.json();
    
  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Reports
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <CategoryChart transactions={transactions.data}/>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <IncomeExpenseChart transactions={transactions.data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
