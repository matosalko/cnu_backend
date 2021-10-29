import express from "express"
import { param, body } from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.recipes.getAllRecipes)

router.get('/:title', param('title').isLength({min: 2, max: 50}), services.recipes.getFilteredRecipe)

router.post(
    '/',
    body('recipe.title').isLength({min: 2, max: 50}),
    body('recipe.text').isLength({min: 0, max: 255}),
    body('recipe.rating').isInt({min: 1, max: 5}),
    body('ingredients').isArray().custom((value) => {
        if(!value.every(Number.isInteger)) throw new Error('Array does not contain Integers')
        return true
    }),
    services.recipes.createNewRecipe        
)

router.put(
    '/:id/rating',
    param('id').isInt({min: 0}),
    body('rating').isInt({min: 1, max: 5}),
    services.recipes.updateRating
)

router.delete(
    '/:id',
    param('id').isInt({min: 0}),
    services.recipes.deleteRecipe
)

export default router