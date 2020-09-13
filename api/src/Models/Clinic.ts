import { IClinic } from '../Interfaces/IClinic';
import { DataTypes, Sequelize, BuildOptions, Model } from 'sequelize';

export type Clinic = Model<IClinic> & IClinic;

export type ClinicModel = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Clinic;
};

export function ClinicFactory(sequelize: Sequelize): ClinicModel {
  return <ClinicModel>sequelize.define('clinic', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
