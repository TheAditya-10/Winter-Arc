/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs';
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/linkedin',
                destination: 'https://www.linkedin.com/',
                permanent: false,
            },
        ]
    }
};

export default withSentryConfig(nextConfig, {
    org: "student-56j",
    project: "winter-arc-2026",

    // Pass the auth token
    authToken: process.env.SENTRY_AUTH_TOKEN,
    // Upload a larger set of source maps for prettier stack traces
    widenClientFileUpload: true,

    // Use a fixed route (recommended)
    tunnelRoute: "/monitoring",


    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,
});
