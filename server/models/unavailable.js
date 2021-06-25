'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unavailable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Unavailable.init(
    {
      asset_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'unavailable_dates',
      modelName: 'Unavailable_Dates',
      underscored: true,
    }
  );
  return Unavailable;
};
