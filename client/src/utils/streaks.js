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

function streakFreeze({ lastStreakUpdate, streakFreezeCount, streakCount, longestStreak }) {
    const { todayStart, timezone, now } = getStreakDates();
    const lastUpdate = new TZDate(lastStreakUpdate, timezone);
    const lastUpdateStart = startOfDay(lastUpdate);
    const streakGap = differenceInDays(todayStart, lastUpdateStart) - 1;
    if (streakGap > streakFreezeCount) {
        return {
            streak_count: 0,
            last_streak_update_date: now.getTime(),
            streak_status: "reset",
        }
    } else {
        return {
            streak_count: streakCount,
            last_streak_update_date: now.getTime() - 24*60*60*1000,
            streak_status: "started",
            streak_freeze_count: streakFreezeCount - streakGap,
        }
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
        const updatedUserInfo = streakFreeze({
            lastStreakUpdate: userInfo.lastStreakUpdate,
            streakFreezeCount,
            streakCount: userInfo.streakCount,
            longestStreak: userInfo.longestStreak,
        })

        return updatedUserInfo
    }

    const currentStreak = userInfo.streakCount;

    if (!isBroken) {
        const updatedUserInfo = {
            streak_count: currentStreak + 1,
            last_streak_update_date: now.getTime(),
            longest_streak: Math.max(currentStreak + 1, userInfo.longestStreak),
            streak_status: "started",
        };

        return updatedUserInfo;
    }

    if (!canFreezeStreak) {
        const updatedUserInfo = {
            streak_count: 1,
            last_streak_update_date: now.getTime(),
            longest_streak: Math.max(1, userInfo.longestStreak),
            streak_status: "started",
        };

        return updatedUserInfo;
    }

    const updatedUserInfo = streakFreeze({
        lastStreakUpdate: userInfo.lastStreakUpdate,
        streakFreezeCount,
        streakCount: userInfo.currentStreak,
        longestStreak: userInfo.longestStreak,
    })
    updatedUserInfo.streak_count += 1
    updatedUserInfo.longestStreak = Math.max(userInfo.lastStreakDate, updatedUserInfo.streak_count)
    updatedUserInfo.streak_status = "started"
    return updatedUserInfo
}

function checkForBonus({streakCount, dailyTaskCompletedCount, streakMilestoneLevel, taskMilestoneLevel}){
    const streakMilestone = {target: [7, 14, 21, 28], reward: [100, 200, 300, 400]}
    const taskMilestone = {target: [1, 20, 30, 40], reward: [50, 100, 150, 200]}

    let messages = { task: [], streak: []}
    let bonusPoints = 0
    let userMilestoneInfo = {}

    if(streakCount && streakMilestoneLevel < 4 && streakCount >= streakMilestone.target[streakMilestoneLevel]){
        userMilestoneInfo.streak_milestone_level = streakMilestoneLevel+1;
        bonusPoints += streakMilestone.reward[streakMilestoneLevel];
        messages.streak.push({text: `Milestone: ${streakCount} day streak completed.`, highlight: `+${streakMilestone.reward[streakMilestoneLevel]} XP BONUS`})
    }

    if(dailyTaskCompletedCount && taskMilestoneLevel < 4 && dailyTaskCompletedCount >= taskMilestone.target[taskMilestoneLevel]){
        userMilestoneInfo.task_milestone_level = taskMilestoneLevel+1;
        bonusPoints += taskMilestone.reward[streakMilestoneLevel];
        messages.task.push({text: `Milestone: ${dailyTaskCompletedCount} daily task completed.`, highlight: `+${taskMilestone.reward[taskMilestoneLevel]} XP BONUS`})
    }

    return {messages, userMilestoneInfo, bonusPoints}

}

export { updateStreak, checkForBonus };
