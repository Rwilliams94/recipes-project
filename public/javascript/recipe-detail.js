const ingredientAmount = document.querySelectorAll("#ingredient-amount");

ingredientAmount.forEach(amount => {
    // if the amount is not an integer and has more than 2 decimals, show only 2 decimals
    if (!Number.isInteger(Number(amount.textContent)) && amount.textContent.split(".")[1].length > 2 )
    amount.textContent = Number(amount.textContent).toPrecision(2)
});
