import { Router } from "express";
import { TodoRoutes } from "./todos/todos.routes";

export class AppRoutes {
  // all routes with versioning
  //status:saved
  static get routes(): Router {
    const routes = Router();
    routes.use("/api/v1/todos", TodoRoutes.routes);

    return routes;
  }
  //versionado de rutas v1
  static get routesV1(): Router {
    const routes = Router();
    routes.use("/todos", TodoRoutes.routes);

    return routes;
  }
  //status:implemented
  static get routerReleaseV1(): Router {
    const baseRouterV1 = Router();

    baseRouterV1.use("/api/v1", AppRoutes.routesV1);
    return baseRouterV1;
  }
}
