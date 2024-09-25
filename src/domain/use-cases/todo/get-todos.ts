import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface getTodosUseCase {
  start(): Promise<TodoEntity[]>;
}

export class GetTodos implements getTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}
  async start(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
