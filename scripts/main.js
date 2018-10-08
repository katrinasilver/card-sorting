const render = require('./partials/render')
const data = require('./partials/data')

document.addEventListener('DOMContentLoad', () => {
  render.headerJs()
})

// Create an instance of story card
const addCardElement = document.querySelector('.create.button:not(.import)')
addCardElement.addEventListener('click', (e) => {
  const stories = document.querySelector('#stories')
  render.addStoryCard(stories)

  // Remove a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)

  // Save a card
  const save = document.querySelector('a.fa-check')
  save.addEventListener('click', () => {
    let text = document.querySelector('.storyline')
    text.setAttribute('readonly', 'readonly')
    text.style.borderWidth = 0
    render.saveStoryCard(save)
  })
})

// Create an instance of card category
const addCategory = document.querySelector('.create.category.button')
addCategory.addEventListener('click', () => {
  const category = document.querySelector('.story-categories')
  render.addCategory(category)
})
