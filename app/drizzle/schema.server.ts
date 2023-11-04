import {
  pgTable,
  text,
  integer,
  boolean,
  serial,
  timestamp,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female"]);
export const relationshipEnum = pgEnum("relationship", [
  "mother",
  "father",
  "son",
  "daughter",
  "grandson",
  "granddaughter",
  "aunt",
  "uncle",
  "brother",
  "sister",
]);

export const homes = pgTable("homes", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  zipCode: integer("zipCode").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  language: text("language").notNull(),
  reviewed: boolean("reviewed").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const persons = pgTable("persons", {
  id: serial("id").primaryKey(),
  home: integer("home")
    .notNull()
    .references(() => homes.id),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  birthday: date("birthday").notNull(),
  genderEnum: genderEnum("genderEnum").notNull(),
  owner: boolean("owner").notNull(),
  relationshipToOwner: relationshipEnum("relationshipToOwner").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});