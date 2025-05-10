/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera archivos estáticos para GitHub Pages
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
}

module.exports = nextConfig 