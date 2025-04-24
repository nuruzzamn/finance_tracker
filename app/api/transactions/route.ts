import { transactions } from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredTransactions = [...transactions.transactions];

    // Apply filters
    if (category) {
      filteredTransactions = filteredTransactions.filter(t => t.category === category);
    }
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(t => t.date >= startDate);
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter(t => t.date <= endDate);
    }

    const summary = updateSummary();
    
    // Calculate pagination
    const total = filteredTransactions.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTransactions = filteredTransactions.slice(start, end);

    return NextResponse.json({
      data: paginatedTransactions,
      summary,
      total,
      page,
      limit
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newTransaction = await request.json();
    
    // Validate required fields
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add new transaction with generated ID
    const transaction = {
      id: (transactions.transactions.length + 1).toString(),
      ...newTransaction
    };

    transactions.transactions.push(transaction);
    updateSummary();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const updatedTransaction = await request.json();
    
    if (!updatedTransaction.id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const index = transactions.transactions.findIndex(t => t.id === updatedTransaction.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    transactions.transactions[index] = {
      ...transactions.transactions[index],
      ...updatedTransaction
    };

    updateSummary();

    return NextResponse.json(transactions.transactions[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const initialLength = transactions.transactions.length;
    transactions.transactions = transactions.transactions.filter(t => t.id !== id);

    if (transactions.transactions.length === initialLength) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    updateSummary();

    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}

function updateSummary() {
  const summary = transactions.transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += Math.abs(transaction.amount);
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, balance: 0 }
  );

  summary.balance = summary.totalIncome - summary.totalExpenses;
  const updatedSummary = {
    totalIncome: Number(summary.totalIncome.toFixed(2)),
    totalExpenses: Number(summary.totalExpenses.toFixed(2)),
    balance: Number(summary.balance.toFixed(2))
  };
  
  transactions.summary = updatedSummary;
  return updatedSummary;
}
