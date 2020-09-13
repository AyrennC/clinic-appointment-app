export interface IConsultationInputDTO {
  doctor: string;
  patient: string;
  diagnosis: string;
  medication: string;
  fee: number;
  date: Date;
}

export interface IConsultation extends IConsultationInputDTO{
  id: string;
  followUp?: IConsultationInputDTO | null;
  updatedAt: Date
}
