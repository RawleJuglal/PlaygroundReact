import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'https://vocal-rugelach-9dea4c.netlify.app/',
  plugins: [react()],
})
