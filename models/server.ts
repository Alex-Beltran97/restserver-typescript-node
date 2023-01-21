import express, { Application } from "express";
import cors from "cors";

import usersRouter from '../routes/users.routes';
import db from "../db/connection";

class Server {

  private app : Application;
  private PORT : string;
  private apiPaths = {
    users: "/api/users"
  };

  constructor() { 
    this.app = express();
    this.PORT = process.env.PORT || "3000";

    // Middlewares

    this.middlewares();

    // Routes

    this.routes();

    // DB Connection

    this.dbConnection();

  };

  async dbConnection(){ 

    try{

      await db.authenticate();

      console.log("Database online");

    } catch( error ){

      console.log( error );

      throw new Error( "error Db connection" );
    };
  };

  middlewares() {

    // Body Parser
    this.app.use( express.json() );
    
    // CORS
    this.app.use( cors() );

    // Static File

    this.app.use( express.static("public") );
  };

  routes() {

    this.app.use( this.apiPaths.users, usersRouter );
  };

  listen() {

    this.app.listen( this.PORT, ()=>{
      console.log(`Server listening in port http://localhost:${ this.PORT }`);
    });

  };
};

export default Server;