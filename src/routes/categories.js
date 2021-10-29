import express from "express"
import { param, body } from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.categories.getAllCategories)

// router.get('/:id', param('id').isInt({min: 0}), services.categories.getFilteredCategories)

router.post(
    '/', 
    body('title').isLength({min: 2, max: 50}), 
    services.categories.createNewCategory
)

router.delete(
    '/:id',
    param('id').isInt({min: 0}),
    services.categories.deleteCategoryById
)

export default router