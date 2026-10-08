import { defineConfig } from '@neon/config/v1';

export default defineConfig({
  auth: true,
  buckets: {
    'hsg-storage': { access: 'public_read' },
  },
});
