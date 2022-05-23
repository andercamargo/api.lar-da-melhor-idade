import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  crm: { type: String, required: true },
  active: { type: Boolean, required: true },
});

export class Doctor {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  crm: string;
  @ApiProperty()
  active: boolean;
}
