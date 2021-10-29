import Sequelize from "sequelize";

import recipe from "./recipe";
import ingredient from "./ingredient";
import category from "./category";

function applyRelations(sequelize) {
  const { ingredient, recipe, category } = sequelize.models;

  ingredient.belongsToMany(recipe, { through: "recipeIngredients" });
  recipe.belongsToMany(ingredient, { through: "recipeIngredients" });

  category.belongsToMany(recipe, { through: "recipeCategories" });
  recipe.belongsToMany(category, { through: "recipeCategories" });
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false,
});

const models = [recipe, ingredient, category];

models.forEach((model) => model(sequelize));

applyRelations(sequelize);

export default sequelize;
