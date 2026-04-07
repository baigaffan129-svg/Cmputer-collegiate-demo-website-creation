import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const phpOrigin = env.VITE_PHP_ORIGIN || 'http://localhost'
  let apiPath = env.VITE_APACHE_API_PATH || '/Computer_collegiate/server/api'
  if (!apiPath.startsWith('/')) apiPath = `/${apiPath}`

  // Production build: assets load from this path when opened via Apache (any device on LAN, port 80).
  const base =
    mode === 'production'
      ? (env.VITE_PUBLIC_BASE?.trim() || '/Computer_collegiate/client/dist/')
      : '/'

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      proxy: {
        '/php-api': {
          target: phpOrigin,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/php-api/, apiPath),
        },
      },
    },
  }
})
