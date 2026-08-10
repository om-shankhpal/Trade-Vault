import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { DashboardProvider } from "../../context/DashboardContext";

function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-800 selection:text-white">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-x-hidden">
          <Navbar />

          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;