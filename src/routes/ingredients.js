import express from "express"
import { param, body, validationResult } from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.ingredients.getAllIngredients)

router.get('/:id', param('id').isInt({min: 0}), services.ingredients.getFilteredIngredients)

router.post(
    '/', 
    body('title').isLength({min: 2, max: 25}), 
    body('unit').isLength({min: 1, max: 2}),
    services.ingredients.createNewIngredient
)

router.delete(
    '/:id',
    param('id').isInt({min: 0}),
    services.ingredients.deleteIngredientById
)

export default router