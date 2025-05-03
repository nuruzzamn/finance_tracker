"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Filter } from "lucide-react";
import { TransactionSummary } from "./TransactionSummary";
import { baseUrl, cn } from "@/lib/utils";
import { TransactionModal } from "./TransactionModal";
import TransactionTable from "./TransactionTable";
import { Transaction, TransactionData } from "@/types/transactions";

const Transactions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  // const [transactions, setTransactions] = useState("");

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [transactions, setTransactions] = useState<TransactionData>();
   const [isLoading, setIsLoading] = useState(false);
  
    const handleSave = (transaction: Transaction) => {
      console.log('New transaction:', transaction);
      setIsModalOpen(false);
    };

  const categories = [
    "All",
    "Food",
    "Salary",
    "Rent",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/api/transactions?page=1&limit=10&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&category=${selectedCategory}`, {
        cache: 'no-store'
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await res.json();
      setTransactions(data || []);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange.startDate, dateRange.endDate, selectedCategory]);

  useEffect(() => { 
    fetchData();
  }, [fetchData]);

  const handleFilter = () => {
    fetchData();
  }
  console.log("isLoading", isLoading);
  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Transactions
            </h1>
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

        {transactions && <TransactionSummary data={transactions.summary}/>}

        {/* Add Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
               <Filter className="mr-2 h-4 w-4" />
                Filter Transactions
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setDateRange({ startDate: "", endDate: "" });
                }}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Clear all filters
              </button>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-3 pr-10 py-2.5 text-sm text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                  >
                    {categories.map((category) => (
                      <option
                        key={category.toLowerCase()}
                        value={category.toLowerCase()}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setDateRange({ startDate: "", endDate: "" });
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleFilter}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
          </div>
          <TransactionTable
            selectedCategory={selectedCategory}
            dateRange={dateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
