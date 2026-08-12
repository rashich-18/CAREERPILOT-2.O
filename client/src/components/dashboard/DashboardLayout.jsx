import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      {/* Background Glow */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[140px]" />

      </div>

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="ml-72">

        <TopNavbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}