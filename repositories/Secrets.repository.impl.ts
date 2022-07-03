import {
  Secret,
  CustomDatabaseReturn,
  SecretParsed,
  Comment,
} from "../utils/typing.ts";
import { ISecretsRepository } from "./Secrets.repository.ts";
import pool from "../utils/connection.ts";

export class SecretsRepository implements ISecretsRepository {
  selectAllString = `
  select
    s.id, s.description, s.created_at,
    c.id as c_id, c.content, c.secret_id as c_secret_id,
    c.created_at as c_created_at, c.upvotes, c.downvotes
  from
    secrets s
  left join comments c
  on s.id = c.secret_id;`;

  async getAll(): Promise<Secret[] | []> {
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
      return [];
    } finally {
      connection.release();
    }
  }
  async getByMatchingValue(value: string): Promise<Secret | null> {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `select * from secrets where description ilike '%${value}%'`
      );

      return secrets;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      connection.release();
    }
  }
  async getById(id: string): Promise<Secret | null> {
    const connection = await pool.connect();
    try {
      const { rows: secrets } = await connection.queryObject(
        `select * from secrets where id = '${id}'`
      );
      return secrets;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      connection.release();
    }
  }
  async deleteById(id: string): Promise<void> {
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

  async addOne(description: string) {
    const connection = await pool.connect();
    try {
      await connection.queryObject(
        `insert into secrets ("description") values ('${description}')`
      );
    } catch (error) {
      console.error(error);
      console.log(error.stack);
    } finally {
      connection.release();
    }
  }
  private parser(databaseResults: CustomDatabaseReturn[]): SecretParsed[] {
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
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        content: comment.content,
        created_at: comment.c_created_at,
      }));
  }
}
