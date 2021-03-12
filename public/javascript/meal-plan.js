let btns = document.querySelectorAll(".diet-btn");
const letsCook = document.getElementById("lets-cook");
const dietCheck = document.getElementById("diet-check");
const recipeBox = document.getElementById("recipes");
const ingredient1 = document.querySelector("#ingredient1");
const ingredient2 = document.querySelector("#ingredient2");
const ingredient3 = document.querySelector("#ingredient3");

btns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    btn.classList.toggle("clicked");
  });
});

function getDietQuery() {
  let diet = "";
  btns.forEach((btn) => {
    if (btn.classList.contains("clicked")) diet += btn.getAttribute("value");
  });
  let array = diet.split(" ");
  let query = "?";
  if (array.includes("glutenFree")) {
    query += "gluten=true&";
  } else {
    query += "";
  }
  if (array.includes("dairyFree")) {
    query += "dairy=true&";
  } else {
    query += "";
  }
  if (array.includes("vegan")) {
    query += "vegan=true&";
  } else {
    query += "";
  }
  if (array.includes("vegetarian")) {
    query += "vegetarian=true&";
  } else {
    query += "";
  }
  return query;
}

function getIngredients() {
  let query = getDietQuery();
  if (ingredient1.value !== "") query += `ingredient1=${ingredient1.value}&`;
  if (ingredient2.value !== "") query += `ingredient2=${ingredient2.value}&`;
  if (ingredient3.value !== "") query += `ingredient3=${ingredient3.value}&`;
  return query;
}

letsCook.addEventListener("click", async (evt) => {
  try {
    const query = getIngredients();
    console.log(query);
    const recipes = await axios.get(`api/recipes/results/${query}`);

    let array = recipes.data;

    recipeBox.innerHTML = ""; // clear search results
    if (array.length === 0) {
      recipeBox.innerHTML += "Sorry, no match found";
    } else {
      array.forEach((recipe) => {
        recipeBox.innerHTML += `
            <div class="post-box">
            <img class="photo" src="${recipe.image}" alt="recipe photo">
            <a href="/recipes/${recipe._id}">${recipe.title}</a>
            </div>
            `;
      });
    }
  } catch (err) {
    console.log(err);
  }
});
