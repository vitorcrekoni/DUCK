import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Middleware plugin to handle Bunny.net origin probes and edge healthchecks
function bunnyEdgePlugin(): Plugin {
  return {
    name: 'bunny-edge-probe',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/health' || url === '/api/health' || url === '/ping') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Cache-Control', 'no-cache');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              status: 'ok',
              service: 'crekoni-duck-decoder',
              cdn: 'bunny.net',
              edgeReady: true,
              timestamp: Date.now(),
            })
          );
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), bunnyEdgePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, CDN-Loop, X-Pull, X-Forwarded-For, X-Forwarded-Proto, BunnyCDN',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': 'frame-ancestors * https://*.bunny.net https://*.b-cdn.net;',
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, CDN-Loop, X-Pull, X-Forwarded-For, X-Forwarded-Proto, BunnyCDN',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': 'frame-ancestors * https://*.bunny.net https://*.b-cdn.net;',
      },
    },
  };
});
