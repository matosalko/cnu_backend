import {validationResult} from "express-validator"

async function getAllRecipes(req, res) {
    try {
        const recipes = await req.context.models.recipe.findAll({
            include: [{model: req.context.models.ingredient}]
        })
        res.send(recipes)
    } catch(error) {
        req.log.error(error)
        res.send(500)
    }  
}

async function getFilteredRecipe(req, res) {
    try {
        const validationResults = validationResult(req)
        if(validationResults.isEmpty()) {
            const filtererRecipes = await req.context.models.recipe.findAll({
                where: {title: req.params.title},
                include: [{model: req.context.models.ingredient}]
            })
            res.send(filtererRecipes)
        } else {
            req.log.info(`validation error value: ${req.params.title}`)
            res.status(400)
            res.send('Validation error.')
        }
        
    } catch(error) {
        req.log.error(error)
        res.send(500)
    }
}

export default { getAllRecipes, getFilteredRecipe }