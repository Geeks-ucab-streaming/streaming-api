export interface IGenericDomainService<T,R> {
    execute(dto:T): Promise<R>;
}

// export class ValidateUserEmailDomainService
//   implements IGenericDomainService<User, boolean>
// {
//   execute(dto: User): boolean {
//     return dto.Email.validateEmail();
//   }
// }