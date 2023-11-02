import * as model from './model.js';
import recipeView from './recipeView.js';

// to support older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeContainer = document.querySelector('.recipe');
const controlRecipes = async function () {
  // Loading recipe from API
  try {

    // getting id
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2. rendering the recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err);
  };
};

// controlRecipes();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes))
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
