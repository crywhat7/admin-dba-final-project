import * as db from "oracledb";
import { DatabaseConfig } from "../types/types";

const config: DatabaseConfig = {
  host: "DESKTOP-91DVLQE",
  port: 1522,
  user: "C##ALICIA",
  password: "kakaroto",
  database: "XE",
};

export class Database {
  constructor() {}

  private connect = async (): Promise<db.Connection> => {
    try {
      const connection = await db.getConnection({
        user: config.user,
        password: config.password,
        connectionString: `${config.host}:${config.port}/${config.database}`,
      });
      return connection;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  public async execute<T>(
    query: string,
    params: db.BindParameters
  ): Promise<T> {
    let connection: db.Connection | undefined | null;
    try {
      connection = await this.connect();
      const result = await connection.execute(query, params);

      const metaData = result.metaData;
      const columns = metaData?.map((column) => column.name);

      if (!columns || !metaData) {
        return [] as unknown as T;
      }
      const camelCaseColumns = this.columnsToCamelCase(columns!);

      const rows = result.rows;

      if (!rows) {
        return [] as unknown as T;
      }

      const rowsAsObjects = rows.map((row: any) => {
        const rowAsObject: { [key: string]: any } = {};
        row.forEach((value: any, index: number) => {
          rowAsObject[camelCaseColumns[index]] = value;
        });
        return rowAsObject;
      });

      if (!rowsAsObjects) {
        return [] as unknown as T;
      }

      return rowsAsObjects as unknown as T;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  public async executeProcedure(
    query: string,
    params: db.BindParameters
  ): Promise<boolean> {
    let connection: db.Connection | undefined | null;
    try {
      connection = await this.connect();

      const result = await connection.execute(query, params);

      console.log("Res:", result);

      const isOk = (result.rowsAffected ?? 0) > 0;

      return isOk || true;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  private columnsToCamelCase = (columns: string[]): string[] => {
    return columns.map((column) => {
      const words = column.split("_");
      const camelCaseWords = words.map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
      const camelCaseColumn = camelCaseWords.join("");
      return camelCaseColumn;
    });
  };
}
