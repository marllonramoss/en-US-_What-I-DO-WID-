

import { UserLoginResponseDto } from "../DTO/UserLoginResponseDto";
import { User } from "../entities/User";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { ITokenGenerator } from "../ports/ITokenGenerator";
import { IUserRepository } from "../ports/IUserRepository";

export class LoginUser {
    constructor(private readonly repo:IUserRepository, private readonly passwordHasher: IPasswordHasher, private readonly tokenGenerator: ITokenGenerator){}

    async execute(userData: {email: string, password: string}): Promise<{user: UserLoginResponseDto; token: string}> {
        const existingUser: User | null = await this.repo.findByEmail(userData.email)
        if(!existingUser){
            throw new Error('Email not found')
        }

        const correctPassword = await this.passwordHasher.compare(userData.password, existingUser.password)
        if(!correctPassword) {
            throw new Error('Invalid Password')
        }

        const token = this.tokenGenerator.generateToken({id: existingUser.id})

        return {
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }, token
        }
    
    }


}