'use strict';
const bcrypt = require('bcryptjs') 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey : 'UserId'})
      User.belongsTo(models.Product, {foreignKey : 'ProductId'})
    }

    static dateFormatEdit (dateOfEvent) {
      let year = dateOfEvent.getFullYear()
      let month = dateOfEvent.getMonth() + 1
      let date = dateOfEvent.getDate()
      if (month.toString().length === 1) {
        month = `0${month}`
      }
      if (date.toString().length === 1) {
        date = `0${date}`
      }
  
      return `${year}-${month}-${date}`
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Username is required'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Password is required'}
      }
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Choose your membership'}
      }
    },
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};