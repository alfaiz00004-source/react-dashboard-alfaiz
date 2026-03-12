import { NavLink } from "react-router-dom";

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
      <button
        className={`fixed inset-0 z-40 bg-slate-900/45 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-label="Close sidebar"
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 transform bg-linear-to-br from-slate-900 to-slate-800 px-5 py-7 text-slate-200 shadow-2xl transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0`}
      >
        <div className="mb-5 flex items-center gap-3 border-b border-slate-400/30 px-2 pb-6">
          <span className="h-3.5 w-3.5 rounded-full bg-linear-to-br from-emerald-400 to-teal-500" />
          <div>
            <p className="m-0 text-base font-bold tracking-tight">Admin Panel</p>
            <p className="text-xs text-slate-400">Business Suite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-teal-500 to-teal-700 text-teal-50"
                    : "text-slate-300 hover:bg-slate-400/20 hover:text-slate-50"
                }`
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