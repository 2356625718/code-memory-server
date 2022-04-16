const Sequelize = require('sequelize');

const sequelizeClient = require('../../lib/sequelize.js');

const {
  DataTypes,
  Model
} = Sequelize;

class CommunityCollectLikes extends Model {}

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
  codeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: '',
    field: 'codeId',
    references: {
      key: 'id',
      model: 'community_codes_model'
    }
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: '0是点赞,1是收藏',
    field: 'type'
  }
};
const options = {
  modelName: 'community_collect_likes',
  sequelize: sequelizeClient,
  indexes: [{
    name: 'id',
    unique: false,
    using: 'BTREE',
    fields: ['id']
  }, {
    name: 'code',
    unique: false,
    using: 'BTREE',
    fields: ['codeId']
  }, {
    name: 'user',
    unique: false,
    using: 'BTREE',
    fields: ['userId']
  }]
};
CommunityCollectLikes.init(attributes, options);
module.exports = CommunityCollectLikes;