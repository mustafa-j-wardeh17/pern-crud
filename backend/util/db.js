import dotenv from 'dotenv'
import Pool from 'pg'
dotenv.config()

export const pool = new Pool.Pool({
    user: 'postgres',
    password: process.env.POSTGRESQL_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

