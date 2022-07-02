import * as postgres from "https://deno.land/x/postgres@v0.14.0/mod.ts";

const databaseUrl = Deno.env.get("DB_URL");
const pool = new postgres.Pool(databaseUrl, 3, true);

export default pool;
