import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.semanticscholar.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix when requesting
      },
    })
  );
};
