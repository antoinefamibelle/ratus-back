import { pgTable, uuid, varchar, timestamp, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const bankAccounts = pgTable('bank_accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  institutionId: varchar('institution_id').notNull(),
  requisitionId: varchar('requisition_id').notNull(),
  status: varchar('status').notNull(),
  accountId: varchar('account_id').notNull(),
  agreementId: varchar('agreement_id').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bankRequisitions = pgTable('bank_requisitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  institutionId: varchar('institution_id').notNull(),
  requisitionId: varchar('requisition_id').notNull(),
  status: varchar('status').notNull(),
  link: text('link').notNull(),
  agreementId: varchar('agreement_id').notNull(),
  reference: varchar('reference').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});