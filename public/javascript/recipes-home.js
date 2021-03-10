console.log("hellow?")

const glutenBtn = document.getElementById("gluten-btn");
const dairyBtn = document.getElementById("dairy-btn");
const veganBtn = document.getElementById("vegan-btn");
const vegetarianBtn = document.getElementById("vegetarian-btn");
const filterList = document.getElementById("filter-results");

if (glutenBtn) console.log("yep")

async function searchRecipe() {
    let query = "?"
    if (glutenBtn.classList.contains("on")) {query += "gluten=true&"} else {query += ""}
    if (dairyBtn.classList.contains("on")) {query += "dairy=true&"} else {query += ""}
    if (veganBtn.classList.contains("on")) {query += "vegan=true&"} else {query += ""}
    if (vegetarianBtn.classList.contains("on")) {query += "vegetarain=true&"} else {query += ""}
    const recipes = await axios.get(`api/recipes/test/${query}`);
    
    let array = recipes.data
    filterList.innerHTML = ""

    array.forEach(recipe => {
        filterList.innerHTML += `
         <li><a href="/recipes/${recipe._id}">${recipe.title}</a></li>
        `  
    });

    

}

async function filterRecipes() {

}


glutenBtn.addEventListener("click", async () => {
    glutenBtn.classList.toggle("on")
    searchRecipe()
})

dairyBtn.addEventListener("click", async () => {
    dairyBtn.classList.toggle("on")
    searchRecipe()
})

veganBtn.addEventListener("click", async () => {
    veganBtn.classList.toggle("on")
    searchRecipe()
})

vegetarianBtn.addEventListener("click", async () => {
    vegetarianBtn.classList.toggle("on")
    searchRecipe()
})




// glutenFree: Boolean,
// vegetarian: Boolean,
// vegan: Boolean,
// dairyFree: Boolean,