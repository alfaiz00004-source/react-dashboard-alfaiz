// Simple spinner component used while data is being loaded.
export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      <span className="mt-3 text-sm font-medium text-slate-600">{message}</span>
    </div>
  );
}

