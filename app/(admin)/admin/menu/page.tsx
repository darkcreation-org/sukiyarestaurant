import MenuTable from "@/components/admin/MenuTable";

export default function MenuPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 bg-gradient-to-r from-[#06C755] via-[#00C300] to-[#06C755] bg-clip-text text-transparent drop-shadow-lg">
            Food Menu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Manage your restaurant menu items
          </p>
        </div>
      </div>
      <MenuTable />
    </div>
  );
}


