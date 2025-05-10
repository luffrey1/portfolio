/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera archivos estáticos para GitHub Pages
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  basePath: '/portfolio', // Ruta base para GitHub Pages
  assetPrefix: '/portfolio/', // Prefijo para los assets en GitHub Pages
}

module.exports = nextConfig 