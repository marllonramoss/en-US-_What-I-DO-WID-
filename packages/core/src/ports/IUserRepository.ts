
import { UserRegisterResponseDto } from "../DTO/UserRegisterResponseDto";
import { User } from "../entities/User";

export interface IUserRepository {
    save(user: User): Promise<UserRegisterResponseDto>
    findByEmail(email: string): Promise<User | null>
}