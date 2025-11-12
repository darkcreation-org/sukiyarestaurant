type OrderStatus = "Received" | "Preparing" | "Ready" | "Completed";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const statusStyles: Record<OrderStatus, string> = {
    Received: "bg-blue-100 text-blue-800",
    Preparing: "bg-yellow-100 text-yellow-800",
    Ready: "bg-orange-100 text-orange-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
}


