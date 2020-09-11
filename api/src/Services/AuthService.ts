import config from '../config';
import { IClinic, IClinicInputDTO } from '../Interfaces/IClinic';
import { ClinicModel } from '../Models/Clinic';
import argon2 from 'argon2';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';

@injectable()
export default class AuthService {
  @inject('ClinicModel') private clinicModel: ClinicModel;
  @inject('Logger') private logger: Logger;

  public async signUp(
    clinicInputDTO: IClinicInputDTO
  ): Promise<{ clinic: IClinic; token: string }> {
    try {
      const salt = randomBytes(32);

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(clinicInputDTO.password, {
        salt,
      });

      this.logger.silly('Creating clinic db record');
      const clinic = await this.clinicModel.create(({
        ...clinicInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      } as unknown) as IClinic);

      this.logger.silly('Generating JWT');
      const token = this.generateToken(clinic);

      if (!clinic) {
        throw new Error('Clinic cannot be created');
      }

      return { clinic, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<{ clinic: IClinic; token: string }> {
    const clinic = await this.clinicModel.findOne({ where: { email } });
    if (!clinic) {
      throw new Error('Clinic not found');
    }

    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(clinic.password, password);

    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(clinic);

      return { clinic, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(clinic): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for clinicId: ${clinic.id}`);
    return jwt.sign(
      {
        id: clinic.id,
        name: clinic.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
