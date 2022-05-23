import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendanceModule } from "../data/attendance/attendance.module";
import { UserModule } from "../data/user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    MongooseModule.forRoot('YOUR_MONGO_CONNECTION'),
    UserModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
