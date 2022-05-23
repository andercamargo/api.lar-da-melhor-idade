import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const HealthCarePlanSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
});


export class HealthCarePlan{
    @ApiProperty()
    code: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    active: boolean;
}