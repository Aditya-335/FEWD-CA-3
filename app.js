// Selecting necessary elements from the DOM
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContent = document.querySelector('.recipe-content');
const popularMealSection = document.getElementById('random-meal');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-closeBtn');

// Event listener on window load to fetch a random recipe
window.addEventListener('load', () =>{
    fetchRecipeRandomData();
});
// Asynchronous function to fetch recipes based on a query
const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
try{
     // Fetch data from the API based on the query
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
    const response = await data.json();
    
    // Clear the previous content and display fetched recipes
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src ="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            
            `
        
        recipeContainer.appendChild(recipeDiv);
    });
}
catch(error){
            // Display an error message if there's an issue fetching recipes

    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
}
}
// Function to fetch data for a random recipe
const fetchRecipeRandomData = async () => {
    try {
    // Fetch data for a random recipe

        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        renderRandomRecipes(data.meals[0]);
    } catch (error) {
        console.error('Error in Fetching Recipes:', error);
    }
};
// Function to render details of a random recipe
const renderRandomRecipes = (meal) => {
    popularMealSection.innerHTML = '';
    const randomMeal = document.createElement('div');
    randomMeal.className = 'recipe';
    popularMealSection.className = 'container'
    randomMeal.innerHTML = `
    <img src ="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `;
     // Create a button to view the recipe and add an event listener
    const button = document.createElement('button');
        button.textContent = "View Recipe";
        randomMeal.appendChild(button);

        button.addEventListener("click", ()=>{
            openRecipeBox(meal);
        });
    popularMealSection.appendChild(randomMeal);
};
// Function to retrieve the list of ingredients for a recipe
const getIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i = 1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
// Function to display the recipe details in a popup
const openRecipeBox = (meal) => {
    recipeContent.innerHTML  = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${getIngredients(meal)}</ul>
    `
    recipeContent.parentElement.style.display = "block";

}
// Event listener to close the recipe popup
recipeCloseBtn.addEventListener("click", ()=>{
    recipeContent.parentElement.style.display = "none";
})
// Event listener for the search button to fetch recipes based on input
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    
})