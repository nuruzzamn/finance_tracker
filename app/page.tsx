import { baseUrl } from "@/lib/utils";
import Dashboard from "./(main)/dashboard/_components/Dashboard";

export default async function Home() {
  const res = await fetch(`${baseUrl}/api/transactions`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  
  const transactions = await res.json(); // Added await here

  console.log("transactions", transactions);
  return (
    <>
      <Dashboard transactions={transactions} /> 
    </>
  );
}
