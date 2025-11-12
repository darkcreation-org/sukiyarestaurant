"use client";

import { useState } from "react";
import { updateOrderStatus, type Order } from "@/lib/admin-api";

type OrderStatus = Order["status"];

interface StatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
  onStatusChange?: (newStatus: OrderStatus) => void;
}

export default function StatusSelect({
  orderId,
  currentStatus,
  onStatusChange,
}: StatusSelectProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setIsUpdating(true);

    try {
      await updateOrderStatus(orderId, newStatus);
      setStatus(newStatus);
      onStatusChange?.(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert on error
      e.target.value = status;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isUpdating}
      className={`text-xs font-medium rounded-md border-0 py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-inset ${
        status === "Received"
          ? "bg-blue-50 text-blue-800 focus:ring-blue-500"
          : status === "Preparing"
          ? "bg-yellow-50 text-yellow-800 focus:ring-yellow-500"
          : status === "Ready"
          ? "bg-orange-50 text-orange-800 focus:ring-orange-500"
          : "bg-green-50 text-green-800 focus:ring-green-500"
      } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <option value="Received">Received</option>
      <option value="Preparing">Preparing</option>
      <option value="Ready">Ready</option>
      <option value="Completed">Completed</option>
    </select>
  );
}


