import { transactions } from '@/db/db';
import { NextResponse } from 'next/server';

export type ParamsType = Promise<{ id: string }>;

export async function generateStaticParams() {
  return transactions.transactions.map((transaction) => ({
    id: transaction.id.toString(),
  }));
}

export async function GET(
  request: Request,
  { params }: { params: ParamsType }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const transaction = transactions.transactions.find(t => t.id === id);

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch transaction, ${error}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: ParamsType }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const updates = await request.json();
    
    const index = transactions.transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    transactions.transactions[index] = {
      ...transactions.transactions[index],
      ...updates
    };

    return NextResponse.json(transactions.transactions[index]);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update transaction, ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: ParamsType }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const initialLength = transactions.transactions.length;
    
    transactions.transactions = transactions.transactions.filter(t => t.id !== id);

    if (transactions.transactions.length === initialLength) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete transaction, ${error}` },
      { status: 500 }
    );
  }
}