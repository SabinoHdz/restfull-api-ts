import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasoruce: TodoDataSource) {}
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasoruce.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasoruce.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasoruce.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasoruce.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasoruce.deleteById(id);
  }
}
