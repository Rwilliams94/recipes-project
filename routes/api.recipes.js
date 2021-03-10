const express = require("express");
const router = new express.Router();
const RecipeModel = require("./../models/Recipe.model.js")



router.get("/", async (req, res, next) => {

    let query = {};

    if (req.query.name) {
        const exp = new RegExp(req.query.name);
        query.name = { $regex: exp };
        console.log(query.name)
    }

    try {
        const searchRes = await RecipeModel.find({title:query.name});
        // searchRes.forEach(res => console.log("the back end ===>", res.title))
        res.json(searchRes)
    } catch (err) {
        console.log(err)
    }

})


router.get("/test", async (req, res, next) => {

    console.log(req.query)
    
    const test = {}
    
    if(req.query.gluten) test.glutenFree = true;
    if(req.query.dairy) test.dairyFree = true;
    if(req.query.vegan) test.vegan = true;
    if(req.query.vegetarian) test.vegetarian = true;

    if (req.query) {
        try {
            console.log(req.query.vegan)
            const searchRes = await RecipeModel.find(test)
            res.json(searchRes)       
            // searchRes.forEach(recipe => console.log(recipe.title)) 
            
        } catch (err) {
            console.log(err)
        }

    }
})


module.exports = router;