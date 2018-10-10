const render = require('./partials/render')
const data = require('./partials/data')
const shortId = require('short-id')

// Responsive header config
render.headerJS()

// Create a card
const storyForm = document.querySelector('#storyForm')
render.fillOutCard(storyForm)
// Show the new card in stories section
const form1 = document.querySelector('#card')
form1.addEventListener('submit', (e) => {
  e.preventDefault()
  const cd = {
    "text": e.target.storycard.value,
    "id": shortId.generate()
  }
  data.cards.unshift(cd)
  render.showCard(document.querySelector('#stories'))

  //Delete a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)

  render.dragDrop('.story.card', '.drag-category')
})

// Create a Category
const categoryForm = document.querySelector('#create-category')
const catSection = document.querySelector('.story-categories')
render.fillOutCategory(categoryForm)
// Show the new category in categories section
const form2 = document.querySelector('#category')
form2.addEventListener('submit', (e) => {
  e.preventDefault()
  const ct = {
    "text": e.target.catcard.value,
    "id": shortId.generate()
  }
  data.categories.unshift(ct)
  render.showCategory(catSection)

  render.dragDrop('.story.card', '.drag-category')

  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)
})
