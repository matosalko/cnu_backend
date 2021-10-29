import { validationResult } from "express-validator";

async function getAllCategories(req, res) {
  try {
    const categories = await req.context.models.category.findAll();
    res.send(categories);
  } catch (error) {
    req.log.error(error);
    res.send(500);
  }
}

async function createNewCategory(req, res) {
  const validationResults = validationResult(req);
  if (validationResults.isEmpty()) {
    try {
      await req.context.models.category.create(req.body);
      res.sendStatus(200);
    } catch (error) {
      req.log.error(error);
      res.send(500);
    }
  } else {
    req.log.info(`validation error value: ${req.body.title}`);
    res.status(400);
    res.send("Validation error.");
  }
}

async function deleteCategoryById(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.category.destroy({
        where: { id: req.params.id },
      });
      res.sendStatus(200);
    } else {
      req.log.info(`validation error value: ${req.params.id}`);
      res.status(400);
      res.send("Validation error.");
    }
  } catch (error) {
    req.log.error(error);
    res.send(500);
  }
}

async function updateCategory(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.category.update(
        { title: req.body.title },
        { where: { id: req.params.id } }
      );
      res.sendStatus(200);
    }
  } catch (error) {
    req.log.error(error);
    res.send(500);
  }
}

export default {
  getAllCategories,
  createNewCategory,
  deleteCategoryById,
  updateCategory,
};
