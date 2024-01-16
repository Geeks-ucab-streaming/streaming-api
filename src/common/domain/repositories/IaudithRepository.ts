export interface IAudithRepository {
  addAudith(user_id: string, operation: string, data: string): Promise<void>;
}
