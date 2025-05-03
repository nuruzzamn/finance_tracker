import React from "react";
import Dashboard from "./_components/Dashboard";
import { baseUrl } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface TransactionData {
  data: Transaction[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const page = async () => {
  const res = await fetch(`${baseUrl}/api/transactions`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  
  const transactions:TransactionData = await res.json(); // Added await here

  console.log("transactions", transactions);
  if (!transactions) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {transactions && 
        <Dashboard transactions={transactions} /> 
      }
    </>
  );
};

export default page;
