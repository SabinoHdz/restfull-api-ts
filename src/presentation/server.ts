import express, { Router } from "express";
interface Options {
  port: number;
  routes: Router;
}
export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  constructor(optinons: Options) {
    const { port, routes } = optinons;
    this.port = port;
    this.routes = routes;
  }
  async start() {
    this.app.use(express.json());
    //Routes
    this.app.use(this.routes);
    this.app.use(express.urlencoded({ extended: true }));
    //middlewares
    //public folder
    this.app.use(express.static("public"));
    this.app.get("*", (req, res) => {
      res.send("Hello World");
    });
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
