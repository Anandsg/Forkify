import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './recipeView.js';

// to support older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './searchView.js';

const controlRecipes = async function () {
  // Loading recipe from API
  try {

    // getting id
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2. rendering the recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderErr();
  };
};

const controlSearchResults = async function () {
  try {
    // 1. get search query
    const query = searchView.getQuery();
    // searchView.clearInput();
    if (!query) return;

    // 2. load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  };
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();