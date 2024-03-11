const { Pool } = require("pg");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConfig);

async function getPgVersion() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT version()");
    console.log(result.rows[0]);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

getPgVersion();
