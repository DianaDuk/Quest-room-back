import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        try{
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                surname: dto.surname,
                phone: dto.phone,
                password: hashedPassword,
            },
        });

        return {
            statusCode: 201,
        };
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError && 
            error.code === 'P2002'
        ) {
            const target = error.meta?.target;
            if (Array.isArray(target) && target.includes('email')) {
                throw new BadRequestException ('Пользователь с таким email уже зарегистрирован');
            }
        }

        console.error ('Registration error:', error);
        throw new InternalServerErrorException('Не удалось зарегистрироваться')
    }
}

    async login(dto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if(!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {sub: user.id, role: user.role};

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
            statusCode: 200,
        };
    }
}