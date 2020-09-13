import { IClinic } from '../Interfaces/IClinic';
import {
  IConsultation,
  IConsultationInputDTO,
} from '../Interfaces/IConsultation';
import * as Models from '../Models';
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
        throw new Error('consultation cannot be created');
      }

      return { consultation };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async attachFollowUp(
    { id: clinicId }: IClinic,
    id: string,
    followUpId: string
  ): Promise<{ consultation: IConsultation }> {
    try {
      const consultation = await this.consultationModel.findOne({
        where: {
          id,
          clinicId,
        },
      });

      if (!consultation) {
        throw new Error('unauthorized to edit consultation');
      }

      const followUp = await this.consultationModel.findOne({
        where: {
          id: followUpId,
          clinicId,
        },
      });

      if (!followUp) {
        throw new Error('unauthorized to attach consultation');
      }

      consultation.followUpId = followUpId;
      await consultation.save();

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
      include: [
        {
          model: Models.ConsultationModel,
          as: 'followUp',
        },
      ],
    });
    if (!consultations) {
      throw new Error('Consultations not found');
    }

    return { consultations };
  }
}
