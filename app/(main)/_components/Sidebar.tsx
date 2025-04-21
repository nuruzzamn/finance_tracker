"use client"
import React from "react";
import { Home, ListPlus, BarChart3, PiggyBank } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/transactions", icon: ListPlus, label: "Transactions" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <aside className="fixed md:static inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm z-50 transition-all duration-300 ease-in-out -translate-x-full md:translate-x-0">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold tracking-tight">Finance Tracker</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  isActive && "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
