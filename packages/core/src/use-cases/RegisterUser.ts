import { CreateUserDto } from "../DTO/CreateUserDto";
import { UserRegisterResponseDto } from "../DTO/UserRegisterResponseDto";
import { User } from "../entities/User";
import { IIdGenerator } from "../ports/IIdGenerator";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { IUserRepository } from "../ports/IUserRepository";
import { Email } from "../values/Email";
import { Name } from "../values/Name";

export class RegisterUser {
    constructor(private readonly repo: IUserRepository, private readonly passwordHasher: IPasswordHasher, private readonly idGenerator: IIdGenerator){}

    async execute(userData: CreateUserDto): Promise<UserRegisterResponseDto> {
        const existingUser = await this.repo.findByEmail(userData.email)
        if(existingUser){
            throw new Error('Email already in use')
        }

        const hashedPassword = await this.passwordHasher.hash(userData.password)
        const idGenerated =  this.idGenerator.generate()
        const name = new Name(userData.name)
        const email = new Email(userData.email)

        const newUser = new User(idGenerated, name.getValue(), email.getValue(), hashedPassword )

         const savedUser = await this.repo.save(newUser)

         return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
         }



    }
}