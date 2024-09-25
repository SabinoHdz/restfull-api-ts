import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface getTodoUseCase {
  start(id: number): Promise<TodoEntity>;
}

export class GetTodo implements getTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  async start(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
