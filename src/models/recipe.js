import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const recipe = (sequelize) => {
  const recipe = sequelize.define("recipe", {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  });

  return recipe;
};

export default recipe;
