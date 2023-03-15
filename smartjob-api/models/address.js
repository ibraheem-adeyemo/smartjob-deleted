'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User,{
        foreignKey:'addressId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })  
      Address.belongsTo(models.Service, {
        foreignKey:'addressId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
      Address.belongsTo(models.Job, {
        foreignKey:'addressId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })  
    }
  }
  Address.init({
    country: {
        type:DataTypes.STRING,
        allowNull:false
    },
    state: {
        type: DataTypes.STRING,
        allowNull:false
    },
    city: {
        type: DataTypes.STRING,
        allowNull:false
    },
    municipality: DataTypes.STRING,
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    longitude: {
        type:DataTypes.FLOAT,
        allowNull: false
    },
    latitude: {
        type:DataTypes.FLOAT,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'address',
  });
  return Address;
};