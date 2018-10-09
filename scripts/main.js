const render = require('./partials/render')
const data = require('./partials/data')
const shortId = require('short-id')

// Responsive header config
render.headerJS()

// Create a card
const storyForm = document.querySelector('#storyForm')
render.fillOutCard(storyForm)

// Show stories section
const stories = document.querySelector('#stories')
render.showAll(stories)

// Show the new card in stories section
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let val = {
    "text": e.target.storycard.value,
    "id": shortId.generate()
  }
  data.unshift(val)
  render.showAll(stories)

  //Delete a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)
})



// Create an instance of card category
const addCategory = document.querySelector('.create.category.button')
addCategory.addEventListener('click', (e) => {
  const category = document.querySelector('.story-categories')
  render.addCategory(category)
})
