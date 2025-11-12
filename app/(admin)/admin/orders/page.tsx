import OrderTable from "@/components/admin/OrderTable";

export default function OrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
      </div>
      <OrderTable />
    </div>
  );
}


