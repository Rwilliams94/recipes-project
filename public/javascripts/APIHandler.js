const inputSearch = document.getElementById("search_input");
const userList = document.getElementById("users-list");
const searchList = document.getElementById("search_results");
// const axios = require("axios");

function readUsers(string) {
    let query = string ? `?name=${string}` : "";
        return axios.get(`api/recipes${query}`)
}

async function handleRead(evt) {
    try {
    let recipes = await readUsers(evt.target.value);
    console.log(recipes.data)
    // .then((recipes) => {
        
    //     searchList.innerHTML += `
    //     <li>${recipes.data.title}</li>
    //     `        
    // })
    } catch(apiError) {
    console.log(apiError)
    }    
}

inputSearch.onkeyup = handleRead

