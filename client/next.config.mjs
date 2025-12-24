/** @type {import('next').NextConfig} */
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

export default nextConfig;
