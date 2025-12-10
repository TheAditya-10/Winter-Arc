"use server"

import { TZDate } from "@date-fns/tz";
import { startOfDay, differenceInDays } from "date-fns";

function getStreakDates() {
    const timezone = "Asia/Calcutta";
    // Create a timezone-aware date object for 'now'
    const now = new TZDate(new Date(), timezone);

    // Get start of day in user's timezone
    const todayStart = startOfDay(now);

    return { now, todayStart, timezone };
}


function canUpdateStreakToday({
    lastStreakDate,
}) {
    // New users can always update their streak
    if (!lastStreakDate) return true;

    const { todayStart, timezone } = getStreakDates();
    const lastUpdate = new TZDate(lastStreakDate, timezone);
    const lastUpdateStart = startOfDay(lastUpdate);

    // Allow update if last update was on a different calendar day
    return differenceInDays(todayStart, lastUpdateStart) > 0;
}

function isStreakBroken({ lastStreakDate }) {
    // New users haven't broken their streak
    if (lastStreakDate < 0) return false;

    const { todayStart, timezone } = getStreakDates();
    const lastUpdate = new TZDate(lastStreakDate, timezone);
    const lastUpdateStart = startOfDay(lastUpdate);

    // Streak is broken if more than one day has passed
    return differenceInDays(todayStart, lastUpdateStart) > 1;
}

function updateStreak(userInfo) {

    const canUpdateStreak = canUpdateStreakToday({
        lastStreakDate: userInfo.last_streak_update_date,
    });
    
    const hasStreakStarted = userInfo.streak_status === "started";

    if (hasStreakStarted && !canUpdateStreak) {
        return {};
    }

    // They missed a day?
    const isBroken = isStreakBroken({
        lastStreakDate: userInfo.last_streak_update_date,
    });

    const { now } = getStreakDates();
    const currentStreak = userInfo.streak_count;

    // Calculate new streak count
    // If broken, start over at 1
    const newCount = isBroken ? 1 : currentStreak + 1;

    // Update longest streak if needed
    const newLongest = Math.max(newCount, userInfo.longest_streak);

    // Update user data
    const updatedUserInfo = {
        streak_count: newCount,
        last_streak_update_date: now.getTime(),
        longest_streak: newLongest,
        streak_status: "started",
    };

    return updatedUserInfo;
}

export { updateStreak };
