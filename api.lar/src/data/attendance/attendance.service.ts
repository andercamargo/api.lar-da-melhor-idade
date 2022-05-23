import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttendanceStatus } from '../../enum/attendance.status.enum';
import { Attendance } from './attendance.model';
import {
  atendimentoComStatusIncorreto,
  atendimentoNaoLocalizado,
  atendimentoNaoIniciado,
  atendimentoJaFinalizado,
} from '../../constants/attendance';
import { Console } from 'console';
import { Patient } from '../patient/patient.model';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<Attendance>,
  ) {}

  async create(doc: Attendance) {
    const result = await new this.attendanceModel(doc).save();
    return result.id;
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();
  }

  async findById(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.attendanceModel.findById(id.toString()).exec();
      if (result != null) {
        var attendance = new Attendance();

        attendance.id = result.id;
        attendance.startDate = result.startDate;
        attendance.endDate = result.endDate;
        attendance.doctor = result.doctor;
        attendance.anamnesis = result.anamnesis;
        attendance.therapeuticApproach = result.therapeuticApproach;
        attendance.prescription = result.prescription;
        attendance.patient = result.patient;
        attendance.status = result.status;

        return attendance;
      }
    }
    return null;
  }

  async update(attendance: Attendance) {
    const result = await this.attendanceModel.findByIdAndUpdate(
      attendance.id,
      attendance,
    );
    return result;
  }

  async remove(id: string) {
    const result = await this.attendanceModel.findByIdAndDelete(id);
    return result;
  }

  async start(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const attendanceModel = await this.attendanceModel
        .findById(id.toString())
        .exec();

      if (attendanceModel == null) {
        return atendimentoNaoLocalizado;
      } else if (attendanceModel.status.toString() != AttendanceStatus.WaittingAttendance.valueOf().toString()) {
        return atendimentoComStatusIncorreto;
      } else {
        attendanceModel.status = AttendanceStatus.Started;

        await this.attendanceModel.findByIdAndUpdate(id, attendanceModel);

        var attendance = new Attendance();

        attendance.id = attendanceModel.id;
        attendance.startDate = attendanceModel.startDate;
        attendance.endDate = attendanceModel.endDate;
        attendance.doctor = attendanceModel.doctor;
        attendance.anamnesis = attendanceModel.anamnesis;
        attendance.therapeuticApproach = attendanceModel.therapeuticApproach;
        attendance.prescription = attendanceModel.prescription;
        attendance.patient = attendanceModel.patient;
        attendance.status = attendanceModel.status;
        
        return attendance;
      }
    }
    return atendimentoNaoLocalizado;
  }

  async finish(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const attendance = await this.attendanceModel
        .findById(id.toString())
        .exec();
      if (attendance == null) {
        return atendimentoNaoLocalizado;
      } else if (attendance.status.toString() == AttendanceStatus.WaittingAttendance.valueOf().toString()) {
        return atendimentoNaoIniciado;
      } else if (attendance.status.toString() == AttendanceStatus.Finished.valueOf().toString()) {
        return atendimentoJaFinalizado;
      } else {
        attendance.status = AttendanceStatus.Finished;

        await this.attendanceModel.findByIdAndUpdate(id, attendance);

        return attendance;
      }
    }
    return atendimentoNaoLocalizado;
  }

  async findPatientById(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.attendanceModel.findById(id.toString()).exec();
      if (result != null) {
        return result.patient;
      }
    }
    return null;
  }

}
