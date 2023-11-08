import * as model from './model.js';
import recipeView from './recipeView.js';
import resultsView from './resultsView.js';
import searchView from './searchView.js';
import paginationView from './paginationView.js';

// to support older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpinner();

    // 1. get search query
    const query = searchView.getQuery();
    // searchView.clearInput();
    if (!query) return;

    // 2. load search results
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage())

    // 3. render initial pagination button
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
  };
};
controlSearchResults();
const controlPagination = function (goToPage) {
  console.log(goToPage);

  // 1. render New results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // 3. render new pagination button
  paginationView.render(model.state.search);

}
const controlServings = function (newServings) {
  // update the recipe serving in state
  model.updateServings(newServings);

  // update the recipe view
  recipeView.render(model.state.recipe);

}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();