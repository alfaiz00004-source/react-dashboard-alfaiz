export default function Settings() {
  return (
    <section className="grid gap-6">
      <header>
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500">
          Manage your account preferences
        </p>
      </header>

      {/* Profile Settings */}
      <div className="border border-gray-200 rounded-xl bg-white p-4">
        <h3 className="text-base font-bold mb-4">Profile</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className="border border-gray-200 rounded-xl bg-white p-4">
        <h3 className="text-base font-bold mb-4">Change Password</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">New Password</label>
            <input
              type="text"
              placeholder="Enter new password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Confirm Password</label>
            <input
              type="text"
              placeholder="Confirm password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="border border-gray-200 rounded-xl bg-white p-4">
        <h3 className="text-base font-bold mb-4">Notifications</h3>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Receive email notifications
          </p>

          <input type="checkbox" className="w-4 h-4" />
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700">
          Save Changes
        </button>
      </div>
    </section>
  );
}