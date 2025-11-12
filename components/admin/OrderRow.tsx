"use client";

import { type Order } from "@/lib/admin-api";
import StatusBadge from "./StatusBadge";
import StatusSelect from "./StatusSelect";

interface OrderRowProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

export default function OrderRow({ order, onStatusChange }: OrderRowProps) {
  return (
    <tr key={order._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.tableNumber}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          {order.items.map((item) => (
            <div key={item.itemId}>
              {item.quantity}x {item.name}
            </div>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ¥{order.total.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusSelect
          orderId={order.orderId}
          currentStatus={order.status}
          onStatusChange={(newStatus) => onStatusChange(order.orderId, newStatus)}
        />
      </td>
    </tr>
  );
}


