import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'

// Plugin to copy static files to dist
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      const publicDir = resolve(__dirname, 'public')
      const distDir = resolve(__dirname, 'dist')
      
      // Ensure dist exists
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
      }
      
      // Copy all files from public to dist
      const copyRecursive = (src, dest) => {
        if (!existsSync(src)) return
        
        const stat = statSync(src)
        if (stat.isDirectory()) {
          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true })
          }
          readdirSync(src).forEach(item => {
            copyRecursive(
              resolve(src, item),
              resolve(dest, item)
            )
          })
        } else {
          copyFileSync(src, dest)
        }
      }
      
      if (existsSync(publicDir)) {
        readdirSync(publicDir).forEach(item => {
          // Skip index.html as Vite generates it
          if (item !== 'index.html') {
            copyRecursive(
              resolve(publicDir, item),
              resolve(distDir, item)
            )
          }
        })
        console.log('✓ Static files copied to dist/')
      }
      
      // Copy 404.html for GitHub Pages SPA routing
      const src404 = resolve(__dirname, 'public/404.html')
      const dest404 = resolve(distDir, '404.html')
      if (existsSync(src404)) {
        copyFileSync(src404, dest404)
        console.log('✓ 404.html copied')
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    copyStaticFiles(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    target: 'esnext',
  },
  publicDir: 'public',
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lucide-react'],
  },
})
