export interface Clinic {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface ClinicInputDTO extends Clinic {
  password: string;
}
