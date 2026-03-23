import { getAnalyticsStats } from "@/lib/analytics";
import { BarChart3, Eye, CalendarCheck, TrendingUp, Smartphone, Monitor, Tablet } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const stats = await getAnalyticsStats(30);

  const deviceIcons: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Analytics</h1>
        <p className="text-text-secondary text-sm mt-1">30 derniers jours</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <Eye className="h-6 w-6 text-action mb-3" />
          <p className="font-[var(--font-display)] text-3xl font-black text-text-primary">{stats.totalViews}</p>
          <p className="text-text-secondary text-sm">Pages vues</p>
        </div>
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <CalendarCheck className="h-6 w-6 text-action mb-3" />
          <p className="font-[var(--font-display)] text-3xl font-black text-text-primary">{stats.totalRdv}</p>
          <p className="text-text-secondary text-sm">Demandes RDV</p>
        </div>
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <TrendingUp className="h-6 w-6 text-action mb-3" />
          <p className="font-[var(--font-display)] text-3xl font-black text-text-primary">{stats.conversionRate}%</p>
          <p className="text-text-secondary text-sm">Taux de conversion</p>
        </div>
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <BarChart3 className="h-6 w-6 text-action mb-3" />
          <p className="font-[var(--font-display)] text-3xl font-black text-text-primary">
            {stats.totalViews > 0 ? Math.round(stats.totalViews / 30) : 0}
          </p>
          <p className="text-text-secondary text-sm">Visites / jour (moy)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top pages */}
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <h2 className="font-bold text-text-primary mb-4">Pages les plus visitees</h2>
          {stats.topPages.length === 0 ? (
            <p className="text-text-muted text-sm py-4 text-center">Aucune donnee</p>
          ) : (
            <div className="space-y-3">
              {stats.topPages.map((page, i) => (
                <div key={page.pathname} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded bg-action/10 text-action text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-text-primary font-medium truncate max-w-[200px]">{page.pathname}</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary">{Number(page.count)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sources */}
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <h2 className="font-bold text-text-primary mb-4">Sources de trafic</h2>
          {stats.sources.length === 0 ? (
            <p className="text-text-muted text-sm py-4 text-center">Aucune donnee</p>
          ) : (
            <div className="space-y-3">
              {stats.sources.map((s) => (
                <div key={s.referrer} className="flex items-center justify-between">
                  <span className="text-sm text-text-primary truncate max-w-[250px]">{s.referrer}</span>
                  <span className="text-sm font-bold text-text-primary">{Number(s.count)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Devices */}
      <div className="bg-white rounded-xl border border-mid-grey p-6">
        <h2 className="font-bold text-text-primary mb-4">Repartition par appareil</h2>
        {stats.devices.length === 0 ? (
          <p className="text-text-muted text-sm py-4 text-center">Aucune donnee</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.devices.map((d) => {
              const Icon = deviceIcons[d.deviceType] || Monitor;
              const total = stats.devices.reduce((s, x) => s + Number(x.count), 0);
              const pct = total > 0 ? Math.round((Number(d.count) / total) * 100) : 0;
              return (
                <div key={d.deviceType} className="flex items-center gap-4 p-4 bg-light-grey rounded-xl">
                  <Icon className="h-8 w-8 text-action" />
                  <div>
                    <p className="font-black text-xl text-text-primary">{pct}%</p>
                    <p className="text-text-secondary text-xs capitalize">{d.deviceType} ({Number(d.count)})</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
