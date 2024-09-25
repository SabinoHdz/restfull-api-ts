import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";
export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  //* DI
  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .start()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepository)
      .start(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });
    new CreateTodo(this.todoRepository)
      .start(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    new UpdateTodo(this.todoRepository)
      .start(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id)
      return res.status(400).json({ message: "ID argument is not a number" });
    new DeleteTodo(this.todoRepository)
      .start(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
