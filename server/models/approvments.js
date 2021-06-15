"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Approvement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Approvement.init(
    {
      owner_id: DataTypes.INTEGER,
      renter_id: DataTypes.INTEGER,
      asset_id: DataTypes.INTEGER,
      owner_approval: DataTypes.BOOLEAN,
      renter_approval: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Approvement",
      underscored: true,
    }
  );
  return Approvement;
};
