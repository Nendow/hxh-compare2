/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you're deploying to a GitHub repository with a different name,
  // update these values to match your repository name
  basePath: '/hxh-compare',
  assetPrefix: '/hxh-compare',
};

export default nextConfig;

