import { pgTable, uuid, boolean, varchar, timestamp } from 'drizzle-orm/pg-core';

export const system = pgTable('system', {
  id: uuid('id').defaultRandom().primaryKey(),
  isMaintenance: boolean('is_maintenance').default(false).notNull(),
  version: varchar('version').default('1.0.0').notNull(),
  goCardlessLastToken: varchar('go_cardless_last_token'),
  goCardlessLastTokenCreatedAt: timestamp('go_cardless_last_token_created_at'),
  goCardlessRefreshToken: varchar('go_cardless_refresh_token'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

