"use client";

import { useState, useEffect } from "react";
import { type Order } from "@/lib/admin-api";

type OrderStatus = Order["status"];

interface FilterBarProps {
  orders: Order[];
  onFilterChange: (filteredOrders: Order[]) => void;
}

export default function FilterBar({ orders, onFilterChange }: FilterBarProps) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [tableFilter, setTableFilter] = useState<string>("all");

  // Get unique table numbers
  const uniqueTables = Array.from(
    new Set(orders.map((order) => order.tableNumber))
  ).sort();

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by table
    if (tableFilter !== "all") {
      filtered = filtered.filter((order) => order.tableNumber === tableFilter);
    }

    onFilterChange(filtered);
  }, [orders, statusFilter, tableFilter, onFilterChange]);

  const handleClearFilters = () => {
    setStatusFilter("all");
    setTableFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || tableFilter !== "all";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="Received">Received</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Table
          </label>
          <select
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
          >
            <option value="all">All Tables</option>
            {uniqueTables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

