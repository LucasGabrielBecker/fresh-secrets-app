import { Secret } from "../utils/typing.ts";

export interface ISecretsRepository {
  getAll(): Promise<Secret[] | []>;
  getByMatchingValue(value: string): Promise<Secret | null>;
  getById(id: string): Promise<Secret | null>;
  deleteById(id: string): Promise<void>;
  addOne(description: string): Promise<void>;
}
