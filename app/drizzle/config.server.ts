import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DATABASE_PATH;
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql);

const migrationClient = postgres(connectionString, { max: 1 });
const migrationDB = drizzle(migrationClient);
await migrate(migrationDB, { migrationsFolder: "app/drizzle/migrations" });
