import { Param, Get, Controller, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AttendanceDTO } from './attendance.dto';
import { Attendance } from './attendance.model';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
    constructor(private service : AttendanceService){}

    @Get('findAll')
    get(){
        return this.service.findAll();
    }

    @Get('findById/:id')
    @ApiParam({name: 'id', required: true, description: 'id of attendance', schema: { oneOf: [{type: 'string'}]}})
    findById(@Param("id") id){
        return this.service.findById(id);
    }

    @Get('find/:id/patient')
    @ApiParam({name: 'id', required: true, description: 'id of attendance', schema: { oneOf: [{type: 'string'}]}})
    findPatientById(@Param("id") id){
        return this.service.findPatientById(id);
    }

    @Post('create')
    create (@Body() attendance: Attendance){
        return this.service.create(attendance);
    }

    @Put('start')
    start (@Body() attendance: AttendanceDTO){
        return  this.service.start(attendance.id);;
    }

    @Put('finish')
    finish (@Body() attendance: AttendanceDTO){
        return  this.service.finish(attendance.id);;
    }

    @Put('update')
    update (@Body() attendance: Attendance){
        return this.service.update(attendance);
    }

    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'id of attendance', schema: { oneOf: [{type: 'string'}]}})
    delete (@Param("id") id){
        return this.service.remove(id);
    }
}
