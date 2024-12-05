import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as userSchema from './schema/user.schema';
import * as bankSchema from './schema/bank.schema';
import * as systemSchema from './schema/system.schema';

// Initialize Neon connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize drizzle with the pool and schema
export const db = drizzle(pool, {
  schema: {
    public: {
      ...userSchema,
      ...bankSchema,
      ...systemSchema,
    },
  },
});

// Export schema for use in other files
export * from './schema/user.schema';
export * from './schema/bank.schema';
export * from './schema/system.schema';
