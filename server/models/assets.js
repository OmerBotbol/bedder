"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Assets, {
        foreignKey: "owner_id",
        targetKey: "id",
      });
    }
  }
  Assets.init(
    {
      owner_id: DataTypes.INTEGER,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      number_of_peoples: DataTypes.INTEGER,
      number_of_rooms: DataTypes.INTEGER,
      kosher: DataTypes.BOOLEAN,
      shabat: DataTypes.BOOLEAN,
      parking: DataTypes.BOOLEAN,
      animals: DataTypes.BOOLEAN,
      ac: DataTypes.BOOLEAN,
      accessibility: DataTypes.BOOLEAN,
      babies: DataTypes.BOOLEAN,
      picture: DataTypes.STRING,
      started_at: DataTypes.DATE,
      ended_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Assets",
      underscored: true,
    }
  );
  return Assets;
};
