"use client"

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TransactionSummary } from "../../transactions/_components/TransactionSummary";
import { cn } from "@/lib/utils";
import { CategoryChart } from "../../_components/CategoryChart";
import { IncomeExpenseChart } from "../../_components/IncomeExpenseChart";
import { TransactionModal } from "../../transactions/_components/TransactionModal";
import TransactionTable from "../../transactions/_components/TransactionTable";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (transaction: Transaction) => {
    console.log('New transaction:', transaction);
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your financial activities
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "inline-flex items-center justify-center rounded-lg px-4 py-2.5",
              "bg-blue-600 text-white shadow-sm",
              "hover:bg-blue-700 dark:hover:bg-blue-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "transition-colors duration-200",
              "text-sm font-semibold"
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </button>
        </div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          label="Add Transaction"
        />

        <TransactionSummary />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <CategoryChart />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <IncomeExpenseChart />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </button>
          </div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
