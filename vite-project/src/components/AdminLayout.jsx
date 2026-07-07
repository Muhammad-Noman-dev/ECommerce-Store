import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;