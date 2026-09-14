import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const claims = sqliteTable('claims', {
  id: text('id').primaryKey(),
  airline: text('airline').notNull(),
  flightNumber: text('flight_number').notNull(),
  date: text('date').notNull(),
  departure: text('departure').notNull(),
  arrival: text('arrival').notNull(),
  delayReason: text('delay_reason').notNull(),
  delayHours: integer('delay_hours').notNull(),
  distanceKm: integer('distance_km').notNull(),
  compensationAmount: integer('compensation_amount').notNull(), // in EUR
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  paidAt: integer('paid_at', { mode: 'timestamp' }),
});
