import {validationResult} from "express-validator"

async function getAllRecipes(req, res) {
    try {
        const recipes = await req.context.models.recipe.findAll({
            include: [{model: req.context.models.ingredient}]
        })
        res.send(recipes)
    } catch(error) {
        req.log.error(error)
        res.sendStatus(500)
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
        res.sendStatus(500)
    }
}


/* 
expected request body for creating new recipe:
    {
        recipe: {
            "title": "recipe title",
            "text": "instructions for making the recipe"
        },
        ingredients: [1, 3]
    }

    ingredients CAN be empty array if no ingredients are needed for recipe
*/
async function createNewRecipe(req, res) {
    try {
        const validationResults = validationResult(req)
        if(validationResults.isEmpty()) {
            const recipe = await req.context.models.recipe.create(req.body.recipe)

            const recipeIngredients = req.body.ingredients.map(ingredientId => { 
                return { recipeId: recipe.id, ingredientId: ingredientId}
            })
            await req.context.models.recipeIngredients.bulkCreate(recipeIngredients)
    
            res.sendStatus(200)
        } else {
            req.log.info(`validation error value: ${req.body}`)
            res.status(400)
            res.send('Validation error.')
        }
        
    } catch(error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}

async function deleteRecipe(req, res) {
    try {
        const validationResults = validationResult(req)
        if(validationResults.isEmpty()) {
            await req.context.models.recipe.destroy({
                where: {id: req.params.id}
            })
            await req.context.models.recipeIngredients.destroy({
                where: {recipeId: req.params.id}
            })
            res.sendStatus(200)
        } else {
            req.log.info(`validation error value: ${req.params.id}`)
            res.status(400)
            res.send('Validation error.')
        }
        
    } catch(error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}

export default { 
    getAllRecipes, 
    getFilteredRecipe,
    createNewRecipe,
    deleteRecipe
}