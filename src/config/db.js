const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || process.env.PGHOST || 'postgres',
    port: Number(process.env.DB_PORT || process.env.PGPORT || 5432),
    user: process.env.DB_USER || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
    database: process.env.DB_NAME || process.env.PGDATABASE || 'ronda_diaria',
    max: 10,
});

module.exports = pool;