import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, required: true }
});

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  active: boolean;
}