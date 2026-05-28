import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;