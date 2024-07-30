/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: "custom",
    loaderFile: "./components/loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hsmahnunqgbyxyjzikko.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatars/avatar/**",
      },
    ],
  },
};

module.exports = nextConfig;
