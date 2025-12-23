import { Card, CardContent } from "@/components/ui/card";
import { IconBolt, IconFlame, IconCrown, IconCheck } from "@tabler/icons-react";

export default function StatsCards({ stats }) {
  const items = [
    {
      label: "Total XP",
      value: stats.totalXp ?? 0,
      icon: <IconBolt className="w-6 h-6" />,
    },
    {
      label: "Current Streak",
      value: stats.currentStreak ?? 0,
      icon: <IconFlame className="w-6 h-6" />,
    },
    {
      label: "Highest Streak",
      value: stats.highestStreak ?? 0,
      icon: <IconCrown className="w-6 h-6" />,
    },
    {
      label: "Tasks Completed",
      value: stats.totalDailyTasks ?? 0,
      icon: <IconCheck className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="rounded-2xl shadow-md bg-gradient-to-br from-background to-muted/30 border border-muted/40 hover:shadow-lg transition-all p-5"
        >
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">{item.label}</p>
              <p className="text-3xl font-semibold mt-2">{item.value}</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
              {item.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
