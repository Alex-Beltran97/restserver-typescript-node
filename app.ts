import Server from './models/server';
import { config } from "dotenv";

// Allow enviroment vasriables
config();

// Init Server
const server = new Server();

server.listen();