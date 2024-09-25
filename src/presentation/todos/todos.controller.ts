import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";
export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  //* DI
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };
  public getTodoById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });
    const create = await this.todoRepository.create(createTodoDto!);
    res.status(201).json(create);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
    res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id)
      return res.status(400).json({ message: "ID argument is not a number" });

    const deleted = await this.todoRepository.deleteById(id);
    res.json(deleted);
  };
}
