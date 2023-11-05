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

export const genders = ["male", "female"];
export const relationships = [
  "self",
  "husband",
  "wife",
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
];

export const genderEnum = pgEnum("gender", genders);

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
  gender: genderEnum("gender").notNull(),
  owner: boolean("owner").notNull(),
  relationshipToOwner: text("relationshipToOwner").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
