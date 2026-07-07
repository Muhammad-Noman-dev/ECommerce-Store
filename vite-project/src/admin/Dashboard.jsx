import AdminLayout from "../components/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white shadow rounded p-5">
          <h3>Total Products</h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3>Total Orders</h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3>Total Users</h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3>Revenue</h3>
          <p className="text-2xl font-bold">Rs. 0</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;