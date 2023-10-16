/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["robohash.org"],
    },
    async rewrites() {  //Integrate( or connect) Express with Next.js
        return [
            {
                source: '/:path',
                destination: "http://localhost:4000/:path",  // check in server folder(express.js server)
            }
        ]
    }
};

module.exports = nextConfig
