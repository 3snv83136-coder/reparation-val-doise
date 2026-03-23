import { prisma } from "./prisma";
import crypto from "crypto";

export async function trackPageView(
  pathname: string,
  referrer?: string,
  userAgent?: string,
  ip?: string
) {
  // Device type from user agent
  let deviceType = "desktop";
  if (userAgent) {
    if (/mobile|android|iphone/i.test(userAgent)) deviceType = "mobile";
    else if (/tablet|ipad/i.test(userAgent)) deviceType = "tablet";
  }

  // Anonymize IP for session hash (RGPD)
  const dateStr = new Date().toISOString().split("T")[0];
  const sessionHash = ip
    ? crypto.createHash("sha256").update(`${ip}-${dateStr}`).digest("hex").slice(0, 16)
    : null;

  await prisma.pageView.create({
    data: {
      pathname,
      referrer: referrer || null,
      userAgent: userAgent?.slice(0, 200) || null,
      deviceType,
      sessionHash,
    },
  });
}

export async function getAnalyticsStats(days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const [totalViews, viewsByDay, topPages, sources, devices, totalRdv] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: since } } }),

    prisma.$queryRawUnsafe<{ date: string; count: number }[]>(
      `SELECT DATE(createdAt) as date, COUNT(*) as count FROM PageView WHERE createdAt >= ? GROUP BY DATE(createdAt) ORDER BY date`,
      since.toISOString()
    ),

    prisma.$queryRawUnsafe<{ pathname: string; count: number }[]>(
      `SELECT pathname, COUNT(*) as count FROM PageView WHERE createdAt >= ? GROUP BY pathname ORDER BY count DESC LIMIT 10`,
      since.toISOString()
    ),

    prisma.$queryRawUnsafe<{ referrer: string; count: number }[]>(
      `SELECT COALESCE(referrer, 'Direct') as referrer, COUNT(*) as count FROM PageView WHERE createdAt >= ? GROUP BY referrer ORDER BY count DESC LIMIT 10`,
      since.toISOString()
    ),

    prisma.$queryRawUnsafe<{ deviceType: string; count: number }[]>(
      `SELECT deviceType, COUNT(*) as count FROM PageView WHERE createdAt >= ? GROUP BY deviceType`,
      since.toISOString()
    ),

    prisma.reservation.count({ where: { createdAt: { gte: since } } }),
  ]);

  const conversionRate = totalViews > 0 ? ((totalRdv / totalViews) * 100).toFixed(2) : "0";

  return { totalViews, viewsByDay, topPages, sources, devices, totalRdv, conversionRate };
}
