import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import http from "http";
import config from "./config/constant";
import cors from "cors";
import compression from "compression";
import routes from "./routes";
import notFoundHandler from "./middleware/not-found.middleware";
import errorHandler from "./middleware/error.middleware";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.loadMiddleWares();
    this.loadRoutes();
  }

  // Middlewares
  private loadMiddleWares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        optionsSuccessStatus: 204,
      })
    );
    this.app.use(compression());
  }

  // Routes
  private loadRoutes(): void {
    routes(this.app);
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  // Database Connection Initialization
  public async initDatabase(): Promise<void> {
    try {
      await connect(
        config.db[config.env === "development" ? "development" : "production"]
      );
      console.log("Database connected successfully");
    } catch (err) {
      console.error("Could not connect to db", err);
    }
  }

  //  Express server
  public run(): http.Server {
    return this.app.listen(config.port, () => {
      console.log(`The server is running on port ${config.port}`);
    });
  }
}

export default App;
