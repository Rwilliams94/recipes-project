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



module.exports = router;