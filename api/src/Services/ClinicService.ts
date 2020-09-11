import { IClinic } from '../Interfaces/IClinic';
import {
  IConsultation,
  IConsultationInputDTO,
} from '../Interfaces/IConsultation';
import { ConsultationModel } from '../Models/Consultation';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

@injectable()
export default class ClinicService {
  @inject('ConsultationModel') private consultationModel: ConsultationModel;
  @inject('Logger') private logger: Logger;

  public async createConsultation(
    { id }: IClinic,
    consultationInputDTO: IConsultationInputDTO
  ): Promise<{ consultation: IConsultation }> {
    try {
      const consultation = await this.consultationModel.create(({
        ...consultationInputDTO,
        clinicId: id,
      } as unknown) as IConsultation);

      if (!consultation) {
        throw new Error('Consultation cannot be created');
      }

      return { consultation };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async listConsultations({
    id,
  }: IClinic): Promise<{ consultations: IConsultation[] }> {
    const consultations = await this.consultationModel.findAll({
      where: { clinicId: id },
    });
    if (!consultations) {
      throw new Error('Consultations not found');
    }

    return { consultations };
  }
}
