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
  let val = {
    "text": e.target.storycard.value,
    "id": shortId.generate()
  }
  data.cards.unshift(val)
  render.showCard(document.querySelector('#stories'))

  //Delete a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)
})

// Create a Category
const categoryForm = document.querySelector('#create-category')
render.fillOutCategory(categoryForm)

const form2 = document.querySelector('#category')
form2.addEventListener('submit', (e) => {
  e.preventDefault()
  let val = {
    "text": e.target.catcard.value,
    "id": shortId.generate()
  }
  data.categories.unshift(val)
  const catSection = document.querySelector('.story-categories')
  render.showCategory(catSection)
})
