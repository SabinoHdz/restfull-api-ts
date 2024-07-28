import express from "express";
interface Options {
  port: number;
}
export class Server {
  private app = express();
  private readonly port: number;
  constructor(optinons: Options) {
    const { port } = optinons;
    this.port = port;
  }
  async start() {
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
