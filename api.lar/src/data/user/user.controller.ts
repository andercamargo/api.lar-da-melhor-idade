import { Param, Get, Controller, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { query } from 'express';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service : UserService){}

    @Get('findAll')
    get(){
        return this.service.findAll();
    }

    @Get('findById/:id')
    @ApiParam({name: 'id', required: true, description: 'id of user', schema: { oneOf: [{type: 'string'}]}})
    findById(@Param("id") id){
        return this.service.findById(id);
    }

    @Post('create')
    create (@Body() user: User){
        return this.service.create(user);
    }

    @Put('update')
    update (@Body() user: User){
        return this.service.update(user);
    }

    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'id of user', schema: { oneOf: [{type: 'string'}]}})
    delete (@Param("id") id){
        return this.service.remove(id);
    }
}
