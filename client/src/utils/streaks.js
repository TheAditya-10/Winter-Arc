import "server-only"

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
    if (!lastStreakDate) return false;

    const { todayStart, timezone } = getStreakDates();
    const lastUpdate = new TZDate(lastStreakDate, timezone);
    const lastUpdateStart = startOfDay(lastUpdate);

    // Streak is broken if more than one day has passed
    return differenceInDays(todayStart, lastUpdateStart) > 1;
}

function getStreakInfo(streakCount) {
    switch (streakCount) {
        case 10: return { bonusPoints: 150, count: streakCount, message: "+150XP Consistency always rewards!!" };
        case 20: return { bonusPoints: 300, count: streakCount, message: "+300XP Consistency always rewards!!" };
        case 30: return { bonusPoints: 500, count: streakCount, message: "+500XP Consistency always rewards!!" };
        case 1: return { bonusPoints: 0, count: streakCount, message: "Your new streak is started, Complete tasks daily to maintain your streak!!" };
        case _: return { bonusPoints: 0, count: streakCount, message: "Your streak is updated successfully." };
    }
}

function updateStreak(userInfo, increment = true) {

    const { streakFreezeCount } = userInfo
    const canFreezeStreak = (streakFreezeCount && streakFreezeCount > 0)

    const canUpdateStreak = canUpdateStreakToday({
        lastStreakDate: userInfo.lastStreakUpdate
    });

    const hasStreakStarted = userInfo.streakStatus === "started";

    if (hasStreakStarted && !canUpdateStreak) {
        return {};
    }

    // They missed a day?
    const isBroken = hasStreakStarted && isStreakBroken({
        lastStreakDate: userInfo.lastStreakUpdate,
    });

    const { now } = getStreakDates();

    if (!increment) {
        if (!isBroken) return {}

        if (!canFreezeStreak) {
            const updatedUserInfo = {
                streak_count: 0,
                last_streak_update_date: now.getTime(),
                streak_status: "reset",
            };
            return updatedUserInfo
        }
        const updatedUserInfo = {
            streak_freeze_count: streakFreezeCount - 1,
            last_streak_update_date: now.getTime(),
        };

        return updatedUserInfo
    }

    const currentStreak = userInfo.streakCount;

    // Calculate new streak count
    // If broken, start over at 1
    const newCount = isBroken && !canFreezeStreak ? 1 : currentStreak + 1;

    // Update longest streak if needed
    const newLongest = Math.max(newCount, userInfo.longestStreak);

    // Update user data
    const updatedUserInfo = {
        streak_count: newCount,
        last_streak_update_date: now.getTime(),
        longest_streak: newLongest,
        streak_status: "started",
        streak_freeze_count: isBroken && canFreezeStreak ? streakFreezeCount - 1 : streakFreezeCount,
    };

    return updatedUserInfo;
}

export { updateStreak, getStreakInfo };
