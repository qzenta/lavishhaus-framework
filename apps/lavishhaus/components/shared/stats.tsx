export interface Stat {
  value: string;
  label: string;
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-heading text-3xl text-charcoal sm:text-4xl">{stat.value}</dd>
          <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
