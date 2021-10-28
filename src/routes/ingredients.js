import express from "express"
import {param} from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.ingredients.getAllIngredients)

router.get('/:id', param('id').isInt({min: 0}), services.ingredients.getFilteredIngredients)

router.post('/', (req, res) => {
    // const ingredient = await req.context.models.ingredient.create(req.body)
    
    res.sendStatus(200)
})

export default router