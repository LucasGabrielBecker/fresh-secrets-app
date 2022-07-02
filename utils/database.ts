// import postgres from "https://deno.land/x/postgresjs/mod.js";
import pool from "./connection.ts";
class Pg {
  async getAll() {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `select * from secrets`
      );
      return secrets;
    } catch (error) {
      console.error(error);
      console.log(error.stack);
    } finally {
      connection.release();
    }
  }

  async getByMatchingValue(value: string) {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `select * from secrets where description ilike '%${value}%'`
      );

      return secrets;
    } catch (error) {
      console.error(error);
    } finally {
      connection.release();
    }
  }

  async getById(id: string) {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `select * from secrets where id = '${id}'`
      );
      return secrets;
    } catch (error) {
      console.error(error);
    } finally {
      connection.release();
    }
  }

  async deleteById(id: string) {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `delete from secrets where id = '${id}'`
      );
      return secrets;
    } catch (error) {
      console.error(error);
    } finally {
      connection.release();
    }
  }

  async addOne(data: { description: string }) {
    const connection = await pool.connect();
    try {
      await connection.queryObject(
        `insert into secrets ("description") values ('${data.description}')`
      );
    } catch (error) {
      console.error(error);
      console.log(error.stack);
    } finally {
      connection.release();
    }
  }

  async close() {
    // await this.connection.end();
  }
}

export default new Pg();
