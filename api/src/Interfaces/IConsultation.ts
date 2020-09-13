import { HasClinic, HasFollowUp, HasId, HasTimestamps } from './Traits';

export interface IConsultationInputDTO {
  doctor: string;
  patient: string;
  diagnosis: string;
  medication: string;
  fee: number;
  date: Date;
}

export type IConsultation = IConsultationInputDTO &
  HasId &
  HasTimestamps &
  HasClinic &
  HasFollowUp;
