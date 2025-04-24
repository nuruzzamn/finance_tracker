"use client"

import React, { useState, useEffect } from 'react';
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
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedData, setPaginatedData] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const fetchTransactions = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/transactions?page=${page}&limit=${itemsPerPage}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
  
      const data = await response.json();
      
      setPaginatedData(data.data || []);
      // Fix: Calculate total pages based on total items and limit
      const calculatedTotalPages = Math.ceil(data.total / data.limit);
      setTotalPages(calculatedTotalPages);
      setTotalItems(data.total || 0);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load transactions',
        icon: 'error',
        confirmButtonText: 'Retry',
      }).then((result) => {
        if (result.isConfirmed) {
          fetchTransactions(page);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transactionId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/transactions/${transactionId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete transaction');
        }

        await Swal.fire({
          title: 'Deleted!',
          text: 'Transaction has been deleted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        fetchTransactions(currentPage);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete transaction',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSave = async () => {
    try {
      await fetchTransactions(currentPage);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginatedData.map((transaction) => (
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
                        <button 
                          onClick={() => handleDelete(transaction.id)} 
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between pt-5">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {totalItems > 0 ? (
              `Showing ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} entries`
            ) : (
              'No entries to show'
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className={`p-2 rounded-md ${
                currentPage === 1 || isLoading
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={isLoading}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 7 && <span className="px-2">...</span>}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || isLoading}
              className={`p-2 rounded-md ${
                currentPage === totalPages || isLoading
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
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