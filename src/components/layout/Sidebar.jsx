import { NavLink } from "react-router-dom";

// Sidebar navigation links displayed in the dashboard layout.
// NavLink is used so the active item can be styled differently.
const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/orders", label: "Orders" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay shown on mobile when sidebar is open; clicking it closes the sidebar */}
      <button
        className={`fixed inset-0 z-40 border-0 bg-slate-900/45 transition-opacity duration-200 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close sidebar"
        type="button"
      />

      <aside
        className={`fixed -left-full top-0 z-50 h-screen w-72 bg-linear-to-br from-slate-900 to-slate-800 px-5 py-7 text-slate-200 shadow-2xl transition-all duration-300 md:sticky md:left-0 ${
          isOpen ? "left-0" : ""
        }`}
      >
        <div className="mb-5 flex items-center gap-3 border-b border-slate-400/30 px-2 pb-6">
          <span className="h-3.5 w-3.5 rounded-full bg-linear-to-br from-emerald-400 to-teal-500" />
          <div>
            <p className="m-0 text-base font-bold tracking-tight">Admin Panel</p>
            <p className="mb-0 mt-0.5 text-xs text-slate-400">Business Suite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-linear-to-r from-teal-500 to-teal-700 text-teal-50"
                    : "text-slate-300 hover:bg-slate-400/20 hover:text-slate-50",
                ].join(" ")
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
