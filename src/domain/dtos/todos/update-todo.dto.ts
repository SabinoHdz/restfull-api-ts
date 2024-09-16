export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}
  get values() {
    const object: { [key: string]: any } = {};
    if (this.text) {
      object.text = this.text;
    }
    if (this.completedAt) {
      object.completedAt = this.completedAt;
    }
    return object;
  }
  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompeltedAt = new Date(completedAt);

    if (!id || isNaN(id)) {
      return ["ID argument is not a number", undefined];
    }
    if (completedAt) {
      if (newCompeltedAt.toString() === "Invalid Date") {
        return ["completedAt is not a valid date", undefined];
      }
    }
    return [undefined, new UpdateTodoDto(id, text, completedAt)];
  }
}
