import { Router } from "express";
import { TodosController } from "./todos.controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository.impl";

export class TodoRoutes {
  static get routes() {
    const router = Router();
    const datasoruce = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasoruce);
    const todosController = new TodosController(todoRepository);

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);
    return router;
  }
}
