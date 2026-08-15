import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import PageBackground from "../common/PageBackground";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070914]">

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN AREA */}
      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ease-out

          ${sidebarOpen ? "ml-72" : "ml-[88px]"}
        `}
      >

        <TopNavbar />

        <PageBackground />

        <main className="px-6 py-6 lg:px-8">
          {children}
        </main>

      </div>

    </div>
  );
}