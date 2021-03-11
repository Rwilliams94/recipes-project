//===============filter based on dish type===============

const recipes = document.querySelectorAll("#recipes-wrapper article");
const boxDishType = document.querySelector("#dish-type-box");

//===============diplay dish type checkboxes
// get an array of arrays of dish attributes
let dishTypes = [];
recipes.forEach((article) =>
  dishTypes.push(article.getAttribute("dish").split(","))
); 
// flatten the array
dishTypes = [].concat.apply([], dishTypes); 
// remove duplicates and empty strings
dishTypes = dishTypes.reduce((a, b) => {
  if (a.indexOf(b) === -1 && b !== "") a.push(b);
  return a;
}, []);
dishTypes.forEach((type) => {
  boxDishType.innerHTML += `<div class="checkboxes">
  <input type="checkbox" name="${type}" id="${type}">
  <label for="${type}">${type}</label>
  </div>`;
});

// checkboxes can only be selected after display !
const checkboxesDish = boxDishType.querySelectorAll("input");

//===============handleclick for checkbox: toggle attribute "checked" and filter
function checkBoxHandler(evt) {
  evt.target.toggleAttribute("checked");
  filterRecipes();
}

//===============show all recipes
function removeFilter() {
  recipes.forEach((article) => (article.style.display = "block"));
}

//===============filter recipes depending on the checkboxes
function filterRecipes() {
  removeFilter();
  //get all the names of checkboxes that are checked in an array
  let checked = [];
  checkboxesDish.forEach((checkbox) => {
    if (checkbox.getAttribute("checked") !== null) checked.push(checkbox.name);
  });
//   console.log("the search is on: ", checked);
  // if at least one checkbox is selected
  if (checked.length !== 0) {
    // hide recipes that do not match any of the criteria
    recipes.forEach((article) => {
      if (
        !checked.some((dishType) =>
          article.getAttribute("dish").includes(dishType)
        )
      )
        article.style.display = "none";
    });
  }
  //   showNumberOfResults()
}

//===============event listener on each checkbox
checkboxesDish.forEach((checkbox) =>
  checkbox.addEventListener("click", checkBoxHandler)
);
