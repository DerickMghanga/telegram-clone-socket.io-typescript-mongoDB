/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["robohash.org"],
    },
    async rewrites() {  //Integrate Express with Next.js
        return [
            {
                source: '/:path',
                destination: "http://localhost:4000/:path",
            }
        ]
    }
};

module.exports = nextConfig
