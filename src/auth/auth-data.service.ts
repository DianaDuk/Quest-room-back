import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { ISignUpRequest } from "./interfaces";

@Injectable()
export class AuthDataService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: ISignUpRequest, hashedPassword: string) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                password: hashedPassword,
            },
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email},
        });
    }

    async updateUserPassword(userId: number, hashedPassword: string) {
        return this.prisma.user.update({
            where: {id: userId},
            data: {password: hashedPassword},
        });
    }
}