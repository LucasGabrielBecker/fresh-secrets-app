// import postgres from "https://deno.land/x/postgresjs/mod.js";
import pool from "./connection.ts";
import { CustomDatabaseReturn, SecretParsed, Comment } from "./index.ts";

class Pg {
  selectAllString = `
  select
    s.id, s.description, s.created_at, c.id as c_id, c.content, c.secret_id as c_secret_id, c.created_at as c_created_at
  from
    secrets s
  left join comments c
  on s.id = c.secret_id;`;

  async getAll() {
    const connection = await pool.connect();
    try {
      const { rows } = await connection.queryObject<CustomDatabaseReturn>(
        this.selectAllString
      );
      const secrets = this.parser(rows);
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

  parser(databaseResults: CustomDatabaseReturn[]): SecretParsed[] {
    const secrets = databaseResults.map((secret) => ({
      id: secret.id,
      description: secret.description,
      created_at: secret.created_at,
      comments: this.getComments(secret.id, databaseResults),
    }));

    const unifier: Record<string, boolean> = {};
    return secrets
      .map((secret) => {
        if (unifier[secret.id]) return null;

        unifier[secret.id] = true;
        return secret;
      })
      .filter(Boolean);
  }

  private getComments(
    secretId: string,
    databaseResults: CustomDatabaseReturn[]
  ): Comment[] {
    return databaseResults
      .filter((secret) => secret.c_secret_id === secretId)
      ?.map((comment) => ({
        id: comment.c_id,
        content: comment.content,
        created_at: comment.c_created_at,
      }));
  }
}

export default new Pg();
