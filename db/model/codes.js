const Sequelize = require('sequelize');

const sequelizeClient = require('../../lib/sequelize.js');

const {
  DataTypes,
  Model
} = Sequelize;

class Codes extends Model {}

const attributes = {
  id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: '',
    field: 'id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'userId'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'title'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'description'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'content'
  },
};
const options = {
  modelName: 'codes',
  sequelize: sequelizeClient,
  indexes: []
};
Codes.init(attributes, options);
module.exports = Codes;