const Sequelize = require('sequelize');

const sequelizeClient = require('../../lib/sequelize.js');

const {
  DataTypes,
  Model
} = Sequelize;

class CommunityActions extends Model {}

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
    field: 'userId'
  },
  codeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '',
    field: 'codeId'
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '0是点赞，1是收藏,2是聊天',
    field: 'type'
  },
};
const options = {
  modelName: 'community_actions',
  sequelize: sequelizeClient,
  indexes: []
};
CommunityActions.init(attributes, options);
module.exports = CommunityActions;