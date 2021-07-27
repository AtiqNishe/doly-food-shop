const error = 'Dear User Your Data Is Invalid Please chick';
const buttonE = document.getElementById('search-btn');
const output = document.getElementById('meal');
const sorry = document.getElementById('ni');
const mealList = document.getElementById('meal');
const mealData = document.getElementById('details');

const newSorry = document.createElement('h1');
newSorry.className = 'notFound';



buttonE.addEventListener('click', ()=>{
    const searchInput = document.getElementById('search-input').value;
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
  

   .then(res => res.json())
   .then(data =>{
       let html = "";
       if(data.meals){
           data.meals.forEach(meal =>{
            
            html += `
            
            <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get-Recipe</a>
            </div>
            </div>
            
            
            
            `
           
            
            
               
           })
       }
       else {
           const notes = 'Sorry, we did not find any meal !!!';
           newSorry.innerText = notes;
           sorry.appendChild(newSorry);
           
       }

       output.innerHTML = html;
   })


   .catch(err => {
        const errorMassage = document.getElementById('h');
        errorMassage.innerText = error;
   })

})


mealList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
         .then(res => res.json())
         .then(data =>{
             mealRecipeModal(data.meals);
         })
    }
})


// Create a modal for food items

const mealRecipeModal = (meal) => {
    console.log(meal);
    meal = meal[0];

    let html = `
    <!-- recipe-close btn-->
   
    <button type='button' class="btn recipe-close-btn"  id="a">
        <i class="fas fa-times"></i>
    </button>
     <!-- meal content-->
     <div class="meal-details-content">
    <h2 class='recipe-title'>${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</P>
    </div>
    <div class="recipe-meal-img">
       <img src="${meal.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
       <a href="${meal.strYoutube}" target="_blank">Watch Video </a>
    </div>
    
    `
   
mealData.innerHTML = html;
mealData.style.display = 'block';

const btnH = document.getElementById('a');
btnH.addEventListener('click',function() {
    console.log('close');
    const mealData = document.getElementById('details');
    mealData.style.display = 'none';
})




}

     




