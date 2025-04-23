"use client"

import React, { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionModal } from './TransactionModal';
import Swal from 'sweetalert2';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>();
  const itemsPerPage = 5;

  // Temporary mock data (expanded)
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Grocery Shopping',
      category: 'Food',
      amount: -1200
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Salary',
      category: 'Income',
      amount: 50000
    },

    {
      id: '3',
      date: '2024-03-14',
      description: 'Salary',
      category: 'Income',
      amount: 15000
    },

    {
      id: '4',
      date: '2024-03-14',
      description: 'Salary',
      category: 'Income',
      amount: 5100
    },
    {
      id: '5',
      date: '2024-03-13',
      description: 'Internet Bill',
      category: 'Utilities',
      amount: -2500
    },
    {
      id: '6',
      date: '2024-03-12',
      description: 'Freelance Work',
      category: 'Income',
      amount: 25000
    },
    {
      id: '7',
      date: '2024-03-11',
      description: 'Restaurant',
      category: 'Food',
      amount: -1800
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleDelete = () => {
    // tag : Show delete message toast
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete logic here
        // For example, remove the transaction from the data store
  
        // toast show
        Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  };

  const handleSave = (updatedTransaction: Transaction) => {
    // Here you would update the transaction in your data store
    console.log('Updated transaction:', updatedTransaction);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Amount</th>
                <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                    {transaction.category}
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    transaction.amount >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.amount}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(transaction)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      <button onClick={handleDelete} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between pt-5">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of {transactions.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSave}
        label="Edit Transaction"
      />
    </>
  );
};

export default TransactionTable;