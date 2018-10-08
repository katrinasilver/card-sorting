const render = require('./partials/render')
const data = require('./partials/data')

document.addEventListener('DOMContentLoad', () => {
  render.headerJs();
})

// Create an instance of story card
const addCardElement = document.querySelector('.create.button:not(.import)');
addCardElement.addEventListener('click', (e) => {
  const stories = document.querySelector('#stories');
  render.addStoryCard(stories)
})

// Create an instance of card category
const addCategory = document.querySelector('.create.category.button');
addCategory.addEventListener('click', (e) => {
  const category = document.querySelector('.story-categories');
  render.addCategory(category)
})
