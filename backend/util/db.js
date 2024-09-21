import dotenv from 'dotenv'
import Pool from 'pg'
dotenv.config()

export const pool = new Pool.Pool({
    connectionString: process.env.DATABASE_URL
})

// Optional: Handle connection errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});
