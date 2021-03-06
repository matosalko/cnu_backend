import { validationResult } from "express-validator";

async function getAllRecipes(req, res) {
  try {
    const recipes = await req.context.models.recipe.findAll({
      include: [
        { model: req.context.models.ingredient },
        { model: req.context.models.category },
      ],
    });
    res.send(recipes);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function getFilteredRecipe(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      const filtererRecipes = await req.context.models.recipe.findAll({
        where: { title: req.params.title },
        include: [{ model: req.context.models.ingredient }],
      });
      res.send(filtererRecipes);
    } else {
      req.log.info(`validation error value: ${req.params.title}`);
      res.status(400);
      res.send("Validation error.");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

/* 
expected request body for creating new recipe:
    {
        recipe: {
            title: "recipe title",
            text: "instructions for making the recipe",
            rating: 5
        },
        ingredients: [1, 3],
        categories: [1, 2]
    }

    ingredients and categories CAN be empty arrays
*/
async function createNewRecipe(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      const recipe = await req.context.models.recipe.create(req.body.recipe);

      const recipeIngredients = req.body.ingredients.map((ingredientId) => {
        return { recipeId: recipe.id, ingredientId: ingredientId };
      });
      await req.context.models.recipeIngredients.bulkCreate(recipeIngredients);

      const recipeCategories = req.body.categories.map((categoryId) => {
        return { recipeId: recipe.id, categoryId: categoryId };
      });
      await req.context.models.recipeCategories.bulkCreate(recipeCategories);

      res.sendStatus(200);
    } else {
      req.log.info(`validation error value: ${req.body}`);
      res.status(400);
      res.send("Validation error.");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function updateRating(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.recipe.update(
        { rating: req.body.rating },
        { where: { id: req.params.id } }
      );
      res.sendStatus(200);
    } else {
      req.log.info(`validation error value: ${req.body.rating}`);
      res.status(400);
      res.send("Validation error.");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function deleteRecipe(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.recipe.destroy({
        where: { id: req.params.id },
      });
      await req.context.models.recipeIngredients.destroy({
        where: { recipeId: req.params.id },
      });
      await req.context.models.recipeCategories.destroy({
        where: { recipeId: req.params.id },
      });
      res.sendStatus(200);
    } else {
      req.log.info(`validation error value: ${req.params.id}`);
      res.status(400);
      res.send("Validation error.");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

export default {
  getAllRecipes,
  getFilteredRecipe,
  createNewRecipe,
  updateRating,
  deleteRecipe,
};
