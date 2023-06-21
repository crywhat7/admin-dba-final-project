import cors from "cors";
import express from "express";
import { router as pacientesRouter } from "../routes/pacientes.routes";
import { router as miscRouter } from "../routes/misc.routes";
import { ServerConfig } from "../app";
import * as morgan from "morgan";

export class Server {
  private app: express.Application;

  constructor(private config: typeof ServerConfig) {
    this.app = express();

    this.middlewares();
    this.routes();
    this.app.use(morgan.default("dev"));
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  };

  private routes = (): void => {
    this.app.use(this.config.pacientesPath, pacientesRouter);
    this.app.use(this.config.miscPath, miscRouter);
  };

  public listen = (): void => {
    this.app.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  };
}
