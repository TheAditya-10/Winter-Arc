"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useCheckStreak from "../hooks/check-streak";
import { FeedbackOverlay } from "./feedback-overlay";

export default function StatsCards({ userStats, isMe, linkedin }) {

  const { stats, streakState, setStreakState } = useCheckStreak(userStats, isMe)
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState(false)

  useEffect(() => {
    setShowFeedbackOverlay(linkedin == "connected" || linkedin == "failed")
  }, [linkedin])

  const items = [
    {
      label: "Total XP",
      value: stats.points ?? 0,
      icon: "/dashboard/snow-flake.svg",
    },
    {
      label: "Current Streak",
      value: stats.streakCount ?? 0,
      icon: "/dashboard/streak.svg",
    },
    {
      label: "Highest Streak",
      value: stats.longestStreak ?? 0,
      icon: "/dashboard/streak.svg",
    },
    {
      label: "Tasks Completed",
      value: stats.dailyTaskCompletedCount ?? 0,
      icon: "/dashboard/snow-flake.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-center p-4 font-inter">
      {items.map((item) => (
        <Card
          key={item.label}
          className="rounded-2xl bg-[#021024] border-2 border-[#616E95] transition-all p-5 bg-[url('/challenge-detail/card-background.svg')] shadow-[0_0_8px_#5689C1]"
        >
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">{item.label}</p>
              <p className="text-3xl font-semibold mt-2">{item.value}</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
              <img src={item.icon} alt="" className="size-8" />
            </div>
          </CardContent>
        </Card>
      ))}
      <FeedbackOverlay
        isOpen={!!streakState}
        setIsOpen={setStreakState}
        title={streakState.title}
        streakState={streakState.state}
        messages={streakState.messages}
      />
      <FeedbackOverlay
        isOpen={showFeedbackOverlay}
        setIsOpen={setShowFeedbackOverlay}
        messages={{ task: [{ text: "", highlight: "" }] }}
        redirectUrl={"/dashboard/me"}
        title={linkedin == "connected" ? "LinkedIn Connected" : "LinkedIn Connection Failed"}
        imgUrl={"/linkedin-logo.svg"}
      />
    </div>
  );
}
