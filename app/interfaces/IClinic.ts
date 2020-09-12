export interface IClinic {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface IClinicInputDTO extends IClinic {
  password: string;
}
