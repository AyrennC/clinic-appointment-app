import { ClinicFactory } from './Clinic';
import { ConsultationFactory } from './Consultation';
import { Sequelize } from 'sequelize';

export const dbConfig = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const ClinicModel = ClinicFactory(dbConfig);

export const ConsultationModel = ConsultationFactory(dbConfig);

ClinicModel.hasMany(ConsultationModel);

ConsultationModel.belongsTo(ConsultationModel, { as: 'followUp' });

ClinicModel.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  delete values.salt;
  return values;
};

ConsultationModel.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.clinicId;
  delete values.followUpId;
  return values;
};
