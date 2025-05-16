/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera archivos estáticos para GitHub Pages
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  basePath: '/portfolio', // Ruta base para GitHub Pages
  assetPrefix: '/portfolio/', // Prefijo para los assets en GitHub Pages
  
  // Asegurar que el archivo de verificación de Google esté disponible en la raíz
  async rewrites() {
    return [
      {
        source: '/google6111867eaad1b79b.html',
        destination: '/portfolio/google6111867eaad1b79b.html'
      }
    ]
  }
}

module.exports = nextConfig 