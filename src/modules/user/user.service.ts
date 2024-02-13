import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { users } from "@prisma/client";
import { CreateOrderDtoRequest } from "./dtos/request/create-user.dto.request";
import { GetUserDtoRequest } from "./dtos/request/get-user.dto.request";

@Injectable()
export class UserService {
    constructor (
        private prismaService: PrismaService,
    ) {}

    async getUserByEmail(email: string): Promise<Partial<users>> {
        try {
            const user = await this.prismaService.users.findFirst({
                where: {
                  email
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }


    async getUsers(payload: GetUserDtoRequest): Promise<any> {
        try {
            const page = Number(payload.page) || 1;
            const limit = Number(payload.limit) || 25;
            const users = await this.prismaService.users.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            
            return {
                count: users.length,
                page,
                data: users
            }
        } catch (error) {
            throw error;
        }
    }

    async createUser(payload: CreateOrderDtoRequest): Promise<Partial<users>> {
        try {
            const isEmailExist = await this.getUserByEmail(payload.email);
            if (isEmailExist) {
                throw new BadRequestException('The email is already use!');
            }
            const users = await this.prismaService.users.create({
                data: payload
            });
            return users;
        } catch (error) {
            throw error;
        }
    }
}