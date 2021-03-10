let btns = document.querySelectorAll(".diet-btn")
const letsCook = document.getElementById("lets-cook")
const dietCheck = document.getElementById("diet-check")
const recipeBox = document.getElementById("recipes")

console.log("hello");

btns.forEach(btn => {
    btn.addEventListener("click", (evt) => {
        btn.classList.toggle("clicked")

    } )
   
})

function getDietQuery() {
    let diet = ""
    btns.forEach(btn => {
    if (btn.classList.contains("clicked")) diet += btn.getAttribute("value")
    })
    let array = diet.split(" ")
    let query = "?"
    if (array.includes("glutenFree")) {query += "gluten=true&"} else {query += ""}
    if (array.includes("dairyFree")) {query += "dairy=true&"} else {query += ""}
    if (array.includes("vegan")) {query += "vegan=true&"} else {query += ""}
    if (array.includes("vegetarian")) {query += "vegetarain=true&"} else {query += ""}
    return query
}

letsCook.addEventListener("click", async (evt) => {
    try {
    const query = getDietQuery();
    console.log(query);
    const recipes = await axios.get(`api/recipes/test/${query}`);
    
    let array = recipes.data

    array.forEach(recipe => {
            recipeBox.innerHTML += `
            <li><a href="/recipes/${recipe._id}">${recipe.title}</a></li>
            `
        })

    } catch (err) {
        console.log(err);
    }
     


}) 
