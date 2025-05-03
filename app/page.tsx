import { baseUrl } from "@/lib/utils";
import Dashboard from "./(main)/dashboard/_components/Dashboard";
import { TransactionData } from "@/types/transactions";

export default async function Home() {
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
}
