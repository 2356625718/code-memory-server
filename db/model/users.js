const Sequelize = require('sequelize');

const sequelizeClient = require('../../lib/sequelize.js');

const {
  DataTypes,
  Model
} = Sequelize;

class Users extends Model {}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: '',
    field: 'id'
  },
  userName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'userName'
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'img'
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'phone'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'password'
  },
};
const options = {
  modelName: 'users',
  sequelize: sequelizeClient,
  indexes: []
};
Users.init(attributes, options);
module.exports = Users;