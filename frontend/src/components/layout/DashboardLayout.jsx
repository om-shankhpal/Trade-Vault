import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { DashboardProvider } from "../../context/DashboardContext";

function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;