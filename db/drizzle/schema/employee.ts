import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { manager } from './manager';
import { users } from './users';

export const employee = pgTable('employee', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', { length: 256 }),
  manager_id: varchar('manager_id', { length: 256 }),
});

export const employeeRelations = relations(employee, ({ one }) => ({
  manager: one(manager, {
    fields: [employee.manager_id],
    references: [manager.id],
  }),
  users: one(users, {
    fields: [employee.id],
    references: [users.id],
  }),
}));
