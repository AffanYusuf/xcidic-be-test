import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateOrderDtoRequest } from "./dtos/request/create-user.dto.request";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { GetUserDtoRequest } from "./dtos/request/get-user.dto.request";


@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
    ){}

    @Get()
    @ApiOperation({ summary: 'Get Order History' })
    @ApiResponse({ status: 200, description: 'Success' })
    async getUsers(@Query() payload: GetUserDtoRequest) {
        return this.userService.getUsers(payload);
    }

    @Post()
    @ApiBody({ type: CreateOrderDtoRequest  })
    @ApiOperation({ summary: 'Create Purchase Order' })
    @ApiResponse({ status: 201, description: 'Success' })
    async createUser(@Body() requestBody: CreateOrderDtoRequest) {
        requestBody.created_by = 'System';
        return this.userService.createUser(requestBody);
    }
}
