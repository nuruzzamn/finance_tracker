export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
  }
  
  export interface TransactionData {
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

  export interface SummaryData {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  }