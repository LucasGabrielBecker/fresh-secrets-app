import postgres from 'https://deno.land/x/postgresjs/mod.js'

const databaseStringConnection = Deno.env.get("DB_URL"); 
const connection = postgres(databaseStringConnection as string);

export default connection