import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Maps route paths to titles shown in the top bar.
const routeTitles = {
  "/": "Dashboard",
  "/users": "Users",
  "/orders": "Orders",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(
    () => routeTitles[location.pathname] ?? "Dashboard",
    [location.pathname]
  );

  // Close the mobile sidebar when the user hits Escape.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-5">
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
