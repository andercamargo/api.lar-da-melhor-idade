import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { HealthCarePlan, HealthCarePlanSchema } from '../healthcareplan/healthcareplan.model';

export const PatientSchema = new mongoose.Schema({
  planCardNumber: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, required: true },
  healthCarePlan: {type: HealthCarePlanSchema, required: true}
});

export class Patient {
  @ApiProperty({description: "Plan card number of Healthcare Plan"})
  planCardNumber: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  active: boolean;
  @ApiProperty({type: HealthCarePlan, description: "Healthcare Plan of Patient"})
  healthCarePlan: HealthCarePlan;
}
