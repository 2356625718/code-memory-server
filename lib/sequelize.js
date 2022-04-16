const Sequelize = require('sequelize')
// 导入数据库配置
const db = require('../config/config')

const sequelize = new Sequelize(db.dbOptions.database, db.dbOptions.username, db.dbOptions.password, {
    logging: function(sql) {
        // logger为log4js的Logger实例
        if(process.env.NODE_ENV !== 'production'){
            console.log(sql)
        }
    },
    port:db.dbOptions.port,
    host: db.dbOptions.host,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 1,
        acquire: 60000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

module.exports = sequelize;