import { Result } from "src/common/domain/logic/Result";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";

export class UserRepositoryMock implements IUserRepository {
  private readonly users: User[] = [];
  async findById(id: string): Promise<User> {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.Id.Id == id) {
        return user;
      }
    }
  }
  async finderCriteria(criteria: Partial<Phone>): Promise<User | undefined> {
    // Search for matching users based on criteria (e.g., phone number)
    const matchingUser = this.users.find((user) => {
      // Implement your matching logic here
      return user.Phone.PhoneNumber === criteria.PhoneNumber; // Example: matching by phone number
    });
    // Return the matching user or undefined if not found
    return matchingUser;
  }
  async createUser(user: User): Promise<Result<User>> {
    this.users.push(user);
    return Result.success<User>(user);
  }

  async updateUser(user: User): Promise<Result<void>> {
    for (let i = 0; i < this.users.length; i++) {
      if (user.Id.equals(this.users[i].Id)) {
        this.users[i] = user;
        return Result.success<void>(void 0);
      }
    }
  }
  
  async findAll(): Promise<any[]> {
    return this.users;
  }
}