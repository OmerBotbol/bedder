'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transactions.init({
    asset_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    renter_id: DataTypes.INTEGER,
    started_at: DataTypes.DATE,
    ended_at: DataTypes.DATE,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
    underscored: true,
  });
  return Transactions;
};