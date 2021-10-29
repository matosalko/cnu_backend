import sequelize from "../models";

export async function populateDB() {
  await sequelize.models.ingredient.bulkCreate([
    {
      title: "salt",
      unit: "g",
    },
    {
      title: "water",
      unit: "ml",
    },
    {
      title: "meat",
      unit: "g",
    },
    {
      title: "flour",
      unit: "g",
    },
  ]);
  await sequelize.models.category.bulkCreate([
    {
      title: "soup",
    },
    {
      title: "main course",
    },
    {
      title: "desert",
    },
    {
      title: "sweet",
    },
    {
      title: "spicy",
    },
  ]);
  // const ingredients = await sequelize.models.ingredient.findAll();
  await sequelize.models.recipe.bulkCreate([
    {
      title: "Simple stew",
      text: "Just put meat into water with salt",
      rating: 3
    },
  ]);
  await sequelize.models.recipeIngredients.bulkCreate([
    {
      recipeId: 1,
      ingredientId: 1,
    },
    {
      recipeId: 1,
      ingredientId: 2,
    },
    {
      recipeId: 1,
      ingredientId: 3,
    },
  ]);
  await sequelize.models.recipeCategories.bulkCreate([
    {
      recipeId: 1,
      categoryId: 2,
    },
    {
      recipeId: 1,
      categoryId: 5,
    },
  ]);

  // const recipesWithIngredients = await sequelize.models.recipe.findAll({
  //   include: [{ model: sequelize.models.ingredient, as: "ingredients" }],
  // });
}
