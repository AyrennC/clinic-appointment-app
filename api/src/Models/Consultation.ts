import { IConsultation } from '../Interfaces/IConsultation';
import { DataTypes, Sequelize, BuildOptions, Model } from 'sequelize';

export type Consultation = Model<IConsultation> & IConsultation;

export type ConsultationModel = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Consultation;
};

export function ConsultationFactory(sequelize: Sequelize): ConsultationModel {
  return <ConsultationModel>sequelize.define('consultation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fee: {
      type: DataTypes.FLOAT,
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
