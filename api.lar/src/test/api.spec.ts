import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import * as request from 'supertest';
import { User } from '../data/user/user.model';
import { Attendance } from '../data/attendance/attendance.model';
import { Patient } from '../data/patient/patient.model';
import { HealthCarePlan } from '../data/healthcareplan/healthcareplan.model';
import { Doctor } from '../data/doctor/doctor.model';
import { AttendanceStatus } from '../enum/attendance.status.enum';
import { AttendanceDTO } from '../data/attendance/attendance.dto';
import {
  atendimentoNaoLocalizado,
  atendimentoNaoIniciado,
  atendimentoJaFinalizado,
} from '../constants/attendance';

var bodyParser = require('body-parser');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const userUrl = '/user/';
  const attendanceUrl = '/attendance/';

  const isRunning = 'App is running!';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET', () => {
    it('should be app is running', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect(isRunning);
    });
  });

  describe('USER', () => {
    it('expected get user by id', () => {
      const path = 'findById/6126c8264f3418f996898b2c';
      const user = new User();

      user.id = '6126c8264f3418f996898b2c';
      user.name = 'Anderson';
      user.active = true;
      user.age = 28;

      return request(app.getHttpServer())
        .get(`${userUrl}${path}`)
        .then((result) => {
          expect(result.statusCode).toEqual(200);
          expect(result.text).toBe(JSON.stringify(user));
        });
    });
  });

  describe('ATTENDANCE', () => {
    var id = null;

    it('expected create a attendance', () => {
      var healthCarePlan = new HealthCarePlan();
      healthCarePlan.code = '123';
      healthCarePlan.name = 'PLANO DE TESTE';
      healthCarePlan.active = true;

      var patient = new Patient();
      patient.planCardNumber = '12345789';
      patient.name = 'PACIENTE TESTE';
      patient.age = 28;
      patient.active = true;
      patient.healthCarePlan = healthCarePlan;

      var doctor = new Doctor();
      doctor.name = 'TESTE DE DOUTOR';
      doctor.age = 44;
      doctor.crm = '12345';
      doctor.active = true;

      var attendance = new Attendance();
      attendance.startDate = new Date('2021-09-08T21:38:56.334Z');
      attendance.doctor = doctor;
      attendance.anamnesis = '-';
      attendance.therapeuticApproach = '-';
      attendance.prescription = '-';
      attendance.patient = patient;
      attendance.status = AttendanceStatus.WaittingAttendance;

      const path = 'create/';

      return request(app.getHttpServer())
        .post(`${attendanceUrl}${path}`)
        .send(attendance)
        .then((result) => {
          id = result.text;
          expect(result.statusCode).toEqual(201);
          expect(result.text).not.toBeNull();
        });
    });

    it('expected to return an error if try to finish an attendance not started', async () => {
      const path = 'finish';
      const attendanceDto = new Attendance();
 
      attendanceDto.id = id;
 
      await request(app.getHttpServer())
        .put(`${attendanceUrl}${path}`)
        .send(attendanceDto)
        .then((result) => {
           expect(result.text.toString()).toBe(atendimentoNaoIniciado);
        });
    });
    
    it('expected start the attendance', async () => {
      const path = 'start';

      var attendanceDto = new AttendanceDTO();
      attendanceDto.id = id;

      await request(app.getHttpServer())
        .put(`${attendanceUrl}${path}`)
        .send(attendanceDto)
        .then((result) => {
          var attendance :Attendance = JSON.parse(result.text);

          expect(result.statusCode).toEqual(200);
          expect(attendance.status.toString()).toBe(AttendanceStatus.Started.valueOf().toString());
        });
    });

    it('expected patient by id of attendance', async () => {
      const path = `find/${id}/patient`;

      var attendanceDto = new AttendanceDTO();
      attendanceDto.id = id;

      await request(app.getHttpServer())
        .get(`${attendanceUrl}${path}`)
        .then((result) => {
          var patient :Patient = JSON.parse(result.text);
          expect(result.statusCode).toEqual(200);
          expect(patient).not.toBeNull();
        });
    });

    it('expected to finish an attendance', async () => {
      const path = 'finish';
      const attendanceDto = new Attendance();
 
      attendanceDto.id = id;
 
      await request(app.getHttpServer())
        .put(`${attendanceUrl}${path}`)
        .send(attendanceDto)
        .then((result) => {
           let teste :Attendance = JSON.parse(result.text);
           expect(result.statusCode).toEqual(200);
           expect(teste.status.toString()).toBe(AttendanceStatus.Finished.valueOf().toString());
        });
    });

    it('expected to return an error if try to finish an attendance already finished', async () => {
      const path = 'finish';
      const attendanceDto = new Attendance();
 
      attendanceDto.id = id;
 
      await request(app.getHttpServer())
        .put(`${attendanceUrl}${path}`)
        .send(attendanceDto)
        .then((result) => {
           expect(result.text.toString()).toBe(atendimentoJaFinalizado);
        });
    });

    it('expected to return an error if try to finish an attendance without mandatory or valid id', async () => {
      const path = 'finish';
      const attendanceDto = new Attendance();
 
      attendanceDto.id = '';
 
      await request(app.getHttpServer())
        .put(`${attendanceUrl}${path}`)
        .send(attendanceDto)
        .then((result) => {
           expect(result.text.toString()).toBe(atendimentoNaoLocalizado);
        });
    });

    it('expected delete a attendance', () => {
      const path = `delete/${id}`;

      return request(app.getHttpServer())
        .delete(`${attendanceUrl}${path}`)
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });
});
