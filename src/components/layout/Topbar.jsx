import { Bell, Moon, Search, UserCircle } from "lucide-react";

// Top navigation bar with search, notifications, and profile actions.
// Receives the page title and a callback to toggle the mobile sidebar.
export default function Topbar({ onMenuClick, title, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-100/90 px-4 py-3 backdrop-blur md:flex-nowrap md:px-6">
      <div className="flex w-full items-center gap-3 md:w-auto">
        <button
          className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
          aria-expanded={isSidebarOpen}
          type="button"
        >
          <span className="h-0.5 w-4 rounded bg-slate-700" />
          <span className="h-0.5 w-4 rounded bg-slate-700" />
          <span className="h-0.5 w-4 rounded bg-slate-700" />
        </button>

        <h1 className="m-0 text-xl font-semibold leading-tight">{title}</h1>
      </div>

      <div className="flex w-full items-center justify-between gap-3 md:w-auto">
        <div className="relative w-full md:w-64">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-slate-900 outline-none placeholder:text-slate-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            type="search"
            placeholder="Search"
            aria-label="Search dashboard"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
            aria-label="Toggle theme"
          >
            <Moon size={18} />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
            aria-label="Profile"
          >
            <UserCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
