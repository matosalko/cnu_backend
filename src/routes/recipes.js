import express from "express"
import {param} from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.recipes.getAllRecipes)

router.get('/:title', param('title').isLength({min: 2, max: 50}), services.recipes.getFilteredRecipe)

router.post(
    '/',
    services.recipes.createNewRecipe        
)

router.delete(
    '/:id',
    param('id').isInt({min: 0}),
    services.recipes.deleteRecipe
)

export default router