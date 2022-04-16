module.exports = {
  "dbOptions": {             // sequelize 数据库配置，该配置用于读取库配置信息
    "database": "code",  // 数据库名称
    "username": "root",    // 用户
    "password": "235662",    // 密码
    "dialect": "mysql",     // 数据库方言
    "host": "localhost",    // 数据库服务地址
    "port": 3306,           // 数据库服务端口号
    "define": {
      "underscored": true,
      "freezeTableName": true,
    }
  },
  "options": {                  // 生成文件的配置信息
    "type": "js",               // 生成代码类型，支持 ts、js
    "dir": "./db/model", // 生成代码文件的输出位置
    "moduleType": "commonjs",   // 生成代码的模块化方式，支持 commonjs、es6
    "sequelizeName": 'Sequelize', // Sequelize 引入Sequelize模块的变量名，默认 Sequelize
    "sequelizeModulePath": 'sequelize', // Sequelize 引入Sequelize模块的模，默认 sequelize
    "sequelizeInsName": 'sequelizeClient', // Sequelize实例的变量名，默认 sequelizeClient
    "sequelizeInsModulePath": '../../lib/sequelize.js', // Sequelize实例的模块路径，无默认值，必填。
  }
}
