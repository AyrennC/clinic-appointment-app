const TYPES = {
  // Services
  AuthService: Symbol('AuthService'),
  ClinicService: Symbol('ClinicService'),

  // Models
  Sequelize: Symbol('Sequelize'),
  ClinicModel: Symbol('ClinicModel'),
  ConsultationModel: Symbol('ConsultationModel'),

  // Utils
  Logger: Symbol('Logger'),
};

export default TYPES;
