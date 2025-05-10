/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera archivos estáticos para GitHub Pages
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  basePath: '', // No es necesario especificar basePath si el sitio está en la raíz
  assetPrefix: '', // No es necesario especificar assetPrefix si el sitio está en la raíz
}

module.exports = nextConfig 