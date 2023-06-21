import dotenv from "dotenv";
import { Server } from "./models/server";

dotenv.config();

export const ServerConfig = {
  port: process.env.PORT ?? "3000",
  pacientesPath: "/api/pacientes",
  miscPath: "/api/misc",
};

console.clear();

const server = new Server(ServerConfig);

server.listen();
