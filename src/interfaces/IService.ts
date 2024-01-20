export interface IService<T> {
  create(obj: unknown): Promise<T>;
  readOne(_id: string): Promise<T>;
}
