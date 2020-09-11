import { HasId, HasPassword, HasTimestamps } from './Traits';

export interface IClinicInputDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export type IClinic = IClinicInputDTO & HasId & HasTimestamps & HasPassword;
