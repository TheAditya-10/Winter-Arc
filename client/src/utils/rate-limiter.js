import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const globalLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(100, "10m"),
  ephemeralCache: new Map(),
  prefix: "@upstash/ratelimit",
  analytics: true,
});

export const submissionLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(3, "1d"),
  ephemeralCache: new Map(),
  prefix: "task-submit-",
  analytics: true,
});


