import {validationResult} from "express-validator"

async function getAllIngredients(req, res) {
    try {
        const ingredients = await req.context.models.ingredient.findAll()
        res.send(ingredients)
    } catch(error) {
        req.log.error(error)
        res.send(500)
    }
}

async function getFilteredIngredients(req, res) {
    try {
        const validationResults = validationResult(req)
        if(validationResults.isEmpty()) {
            const filteredIngredients = await req.context.models.ingredient.findAll({
                where: {id: req.params.id}
            })
            if(filteredIngredients.length) {
                res.send(filteredIngredients)
            } else {
                req.log.info(`Item not found id: ${req.params.id}`)
                res.status(404)
                res.send('Ingredient does not exist')
            }
        } else {
            req.log.info(`validation error value: ${req.params.id}`)
            res.status(400)
            res.send('Validation error.')
        }
        
    } catch(error) {
        req.log.error(error)
        res.send(500)
    }
}

export default { getAllIngredients, getFilteredIngredients }