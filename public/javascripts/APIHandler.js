
const inputSearch = document.getElementById("search_input");
const userList = document.getElementById("users-list");
const searchList = document.getElementById("search_results");
// const axios = require("axios");

async function readUsers(string) {
    let query = string ? `?name=${string}` : "";
    let results = await axios.get(`api/recipes${query}`)
    return results

}

async function handleRead(evt) {
    try {
    let recipes = await readUsers(evt.target.value);
    let array = recipes.data
    searchList.innerHTML = ""

    array.forEach(recipe => {
        console.log(recipe.title)
        searchList.innerHTML += `
         <li><a href="/recipes/${recipe._id}">${recipe.title}</a></li>
        `  
         
    })
    

    } catch(apiError) {
    console.log(apiError)
    }    
    
}

inputSearch.onkeyup = handleRead

