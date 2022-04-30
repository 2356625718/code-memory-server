const Sequelize = require('sequelize');

const sequelizeClient = require('../../lib/sequelize.js');

const {
  DataTypes,
  Model
} = Sequelize;

class CommunityCodes extends Model {}

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'userId',
    references: {
      key: 'id',
      model: 'users_model'
    }
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'description'
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'code'
  },
  collect: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'collect'
  },
  good: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'good'
  },
  talk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'talk'
  },
};
const options = {
  modelName: 'community_codes',
  sequelize: sequelizeClient,
  indexes: [{
    name: 'userId',
    unique: false,
    using: 'BTREE',
    fields: ['userId']
  }]
};
CommunityCodes.init(attributes, options);
module.exports = CommunityCodes;