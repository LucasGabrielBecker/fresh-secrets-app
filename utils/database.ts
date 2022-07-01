import postgres from "https://deno.land/x/postgresjs/mod.js";
class Pg {
  connection: any;
  config: any;
  constructor() {
    this.config = {
      user: Deno.env.get("DB_USER"),
      database: Deno.env.get("DB_NAME"),
      hostname: Deno.env.get("DB_HOSTNAME"),
      password: Deno.env.get("DB_PASSWORD"),
      port: Deno.env.get("DB_PORT"),
    };

    if (!this.connection) this.startClient();
  }

  startClient() {
    const databaseStringConnection = Deno.env.get("DB_URL");
    this.connection = postgres(databaseStringConnection as string);
    return this.connection;
  }

  async getAll() {
    try {
      if(!this.connection) await this.startClient();
      const secrets = await this.connection`select * from secrets`;
      await this.close();
      return secrets;
      
    } catch (error) {
      console.error(error)
      console.log(error.stack)
    }
  }

  async getByMatchingValue(value: string) {
    if(!this.connection) await this.startClient();
    const secrets = await this
      .connection`select * from secrets where description ilike '%${value}%'`;

    await this.close();
    return secrets;
  }

  async getById(id: string) {
    if(!this.connection) await this.startClient();
    try {
      const secrets = await this
        .connection`select * from secrets where id = '${id}'`;
      await this.close();
      return secrets;
    } catch (error) {
      console.error(error);
    } finally {
      await this.close();
    }
  }

  async deleteById(id: string) {
    if(!this.connection) await this.startClient();
    try {
      await this.connection`delete from secrets where id = ${id}`;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await this.close();
    }
  }

  async addOne(data: { description: string }) {
    if(!this.connection) await this.startClient();
    try {
      await this
        .connection`insert into secrets ("description") values (${data.description})`;
    } catch (error) {
      console.error(error);
      console.log(error.stack);
    } finally {
      await this.close();
    }
  }

  async close() {
    await this.connection.end();
  }
}

export default new Pg();
