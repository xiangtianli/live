import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  proxy:{
    '/api': {
      'target': 'http://localhost:8082',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  }
});
