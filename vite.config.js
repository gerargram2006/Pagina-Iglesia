// Importa la función defineConfig desde Vite para definir la configuración del proyecto
import { defineConfig } from 'vite'
// Importa el plugin oficial de React para Vite, necesario para compilar JSX y Fast Refresh
import react from '@vitejs/plugin-react'

// Enlace a la documentación oficial de configuración de Vite
// https://vite.dev/config/
// Exporta la configuración por defecto usando defineConfig (que ofrece autocompletado y validación)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
