import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceController } from './attendance.controller';
import { AttendanceSchema } from './attendance.model';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Attendance',
        schema: AttendanceSchema,
      },
    ]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
