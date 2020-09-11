import LoggerInstance from './Logger';
import * as Models from '../Models';
import { ClinicModel } from '../Models/Clinic';
import { ConsultationModel } from '../Models/Consultation';
import AuthService from '../Services/AuthService';
import ClinicService from '../Services/ClinicService';
import { Container } from 'inversify';
import { Logger } from 'winston';

const container = new Container();

container.bind<AuthService>('AuthService').to(AuthService);
container.bind<ClinicService>('ClinicService').to(ClinicService);

container.bind<ClinicModel>('ClinicModel').toConstantValue(Models.ClinicModel);
container
  .bind<ConsultationModel>('ConsultationModel')
  .toConstantValue(Models.ConsultationModel);

container.bind<Logger>('Logger').toConstantValue(LoggerInstance);

export default container;
