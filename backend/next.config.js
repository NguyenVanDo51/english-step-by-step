const path = require("path")
const withPWA = require("next-pwa")
const withPlugins = require("next-compose-plugins")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "authjs.dev" },
      { protocol: "https", hostname: "img.icons8.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.talk4learn.com" }],
      destination: "https://talk4learn.com/:path*",
      permanent: true,
    },
  ],
}

module.exports = withPlugins(
  [
    withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    }),
  ],
  nextConfig
)
