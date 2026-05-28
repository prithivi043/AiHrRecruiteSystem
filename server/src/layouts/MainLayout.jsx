import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;