module.exports = (sequelize, DataTypes) =>
sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);