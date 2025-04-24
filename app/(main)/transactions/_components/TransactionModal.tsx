"use client"

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Swal from 'sweetalert2';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onSave: (transaction: Transaction) => void;
  label: string;
}

export const TransactionModal = ({ isOpen, onClose, transaction, onSave, label }: TransactionModalProps) => {
  const [formData, setFormData] = useState<Transaction>({
    id: '',
    description: '',
    amount: 0,
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
  });

  const [transactionType, setTransactionType] = useState<'expense' | 'income'>(
    transaction?.amount && transaction.amount >= 0 ? 'income' : 'expense'
  );

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
      setTransactionType(transaction.amount >= 0 ? 'income' : 'expense');
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Determine if it's an income or expense category
      const finalAmount = transactionType === 'expense' 
        ? -Math.abs(formData.amount)
        : Math.abs(formData.amount);

      const updatedTransaction = {
        ...formData,
        amount: finalAmount,
      };

      // Make API call based on whether it's an update or create
      const url = formData.id 
        ? `http://localhost:3000/api/transactions/${formData.id}`
        : 'http://localhost:3000/api/transactions';

      const response = await fetch(url, {
        method: formData.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      const data = await response.json();
      
      onSave(data);
      onClose();

      Swal.fire({
        title: 'Success!',
        text: `Transaction ${formData.id ? 'updated' : 'created'} successfully`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // Add auto refresh
      window.location.reload();
    } catch (error) {
      console.error('Error saving transaction:', error);
      Swal.fire({
        title: 'Error!',
        text: `Failed to ${formData.id ? 'update' : 'create'} transaction`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Edit Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">

          <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Transaction Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={() => setTransactionType('expense')}
                className="form-radio text-red-500"
              />
              <span className="ml-2">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="income"
                checked={transactionType === 'income'}
                onChange={() => setTransactionType('income')}
                className="form-radio text-green-500"
              />
              <span className="ml-2">Income</span>
            </label>
          </div>
        </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                required
              />
            </div>

            <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <div className="relative">
            <span className={`absolute left-3 top-2 ${
              transactionType === 'expense' ? 'text-red-500' : 'text-green-500'
            }`}>
              {transactionType === 'expense' ? '-' : '+'}
            </span>
            <input
              type="number"
              value={Math.abs(formData.amount)}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) || 0 })}
              className="w-full pl-7 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
            
            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="number"
                value={Math.abs(formData.amount)}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                required
              />
            </div> */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
              >
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};