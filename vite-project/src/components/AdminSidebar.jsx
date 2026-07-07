import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-4">
        <NavLink to="/admin">Dashboard</NavLink>

        <NavLink to="/admin/products">Products</NavLink>

        <NavLink to="/admin/add-product">Add Product</NavLink>

        <NavLink to="/admin/categories">Categories</NavLink>

        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink
  to="/admin/products"
  onClick={() => console.log("Admin Products Clicked")}
>
  Products
</NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;