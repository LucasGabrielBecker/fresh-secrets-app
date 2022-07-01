import postgres from "https://deno.land/x/postgresjs/mod.js";
class Pg {
  connection: any;
  config: any;
  constructor() {
    this.config = {
      user: "kbjnfxzb",
      database: "kbjnfxzb",
      hostname: "motty.db.elephantsql.com",
      password: "K6lwTosxoR2js65mb_8Hy5NuPxwLsbKm",
      port: 5432,
    };

    if (!this.connection) this.startClient();
  }

  startClient() {
    this.connection = postgres(
      "postgres://kbjnfxzb:K6lwTosxoR2js65mb_8Hy5NuPxwLsbKm@motty.db.elephantsql.com/kbjnfxzb"
    );
    return this.connection;
  }

  async getAll() {
    const secrets = await this.connection`select * from secrets`;
    await this.close();
    return secrets;
  }

  async getByMatchingValue(value: string) {
    const secrets = await this
      .connection`select * from secrets where description ilike '%${value}%'`;

    await this.close();
    return secrets;
  }

  async getById(id: string) {
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
