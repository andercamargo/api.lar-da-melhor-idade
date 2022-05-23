import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { AttendanceStatus } from '../../enum/attendance.status.enum';
import { Doctor, DoctorSchema } from '../doctor/doctor.model';
import { Patient, PatientSchema } from '../patient/patient.model';

export const AttendanceSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  doctor: { type: DoctorSchema, required: true },
  anamnesis: { type: String, required: true },
  therapeuticApproach: { type: String, required: true },
  prescription: { type: String, required: true },
  patient: { type: PatientSchema, required: true },
  status: {type: String, enum: AttendanceStatus, default: AttendanceStatus.WaittingAttendance, required: true}
});

export class Attendance {
  id: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty({ type: Doctor,  description: "Doctor of Attendance" })
  doctor: Doctor;
  @ApiProperty()
  anamnesis: string;
  @ApiProperty()
  therapeuticApproach: string;
  @ApiProperty()
  prescription: string;
  @ApiProperty({ type: Patient, description: "Patient of Attendance" })
  patient: Patient;
  @ApiProperty({enum: AttendanceStatus, default: AttendanceStatus.WaittingAttendance})
  status: AttendanceStatus;
}