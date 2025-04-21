import React from "react";
import { 
    Home, 
    ListPlus, 
    BarChart3, 
  } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={
          ("fixed md:static inset-y-0 left-0 w-64 bg-card border-r shadow-sm z-50 transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0")}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <div className="flex items-center gap-2">
              {/* <PiggyBank className="h-6 w-6 text-primary" /> */}
              <h1 className="text-lg font-bold">Finance Tracker</h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2 py-4 h-screen">
            <nav className="space-y-1">
                <Link href="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                  <Home className="h-5 w-5" />
                  <div className="text-lg font-normal flex items-center">Dashboard</div>
                </Link>

                <Link href="/transactions" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                  <ListPlus className="h-5 w-5" />
                  <div className="text-lg font-normal flex items-center">Transactions</div>
                </Link>

                <Link href="/reports" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                  <BarChart3 className="h-5 w-5" />
                  <div className="text-lg font-normal flex items-center">Reports</div>
                </Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
