import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}
export class TodosController {
  private todos: Todo[] = [];
  constructor() {
    this.todos = [
      { id: 1, text: "Learn TypeScript", completedAt: new Date() },
      { id: 2, text: "Learn Clean Architecture", completedAt: new Date() },
      { id: 3, text: "Learn SOLID", completedAt: null },
    ];
  }

  //* DI
  public getTodos = (req: Request, res: Response) => {
    res.json(this.todos);
  };
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ message: "Invalid id" });

    const todo = this.getTodoFindId(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  };
  public getTodoFindId = (id: number) => {
    return this.todos.find((todo) => todo.id === id);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Invalid text" });

    const newTodo: Todo = {
      id: this.todos.length + 1,
      text,
      completedAt: new Date(),
    };
    this.todos.push(newTodo);
    res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;
    if (!id) return res.status(400).json({ message: "Invalid data" });

    const todo = this.getTodoFindId(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    const index = this.todos.indexOf(todo);

    this.todos[index] = {
      ...todo,
      text: text || todo.text,
      completedAt: new Date(!!completedAt ? completedAt : todo.completedAt),
    };

    res.json(this.todos[index]);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ message: "Invalid id" });

    const todo = this.getTodoFindId(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  };
}
