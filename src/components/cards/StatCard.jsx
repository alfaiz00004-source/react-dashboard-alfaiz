// Renders a grid of KPI cards with icons and values.
export default function StatCard({ cards=[] }) {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.key} className="border border-gray-200 rounded-xl bg-white p-4">
            
            <div className="flex items-center justify-between">
              <p className="text-slate-500 text-sm">{card.title}</p>
              <Icon className="w-5 h-5 text-slate-500" />
            </div>

            <p className="mt-1 text-2xl font-bold">{card.value}</p>

            <p className="mt-1 text-slate-600 text-sm">
              {card.description}
            </p>

          </article>
        );
      })}

    </div>
  );
}