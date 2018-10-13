const render = require('./partials/render')
const data = require('./partials/data')
const shortId = require('short-id')

render.headerJS() // Header stuff
// Create a Card
const storyForm = document.querySelector('#storyForm')
const stories = document.querySelector('#stories')

render.fillOutCard(storyForm) // Generate Card Form
const saveC = localStorage.getItem('cardsData') || '[]' // Retrieve card data if any
if (saveC.length > 0) {
  data.cards = JSON.parse(saveC)
  render.showCard(stories)
}

const newCard = document.querySelector('#card')
newCard.addEventListener('submit', (e) => {
  e.preventDefault()
  const cd = {
    cardvalue: e.target.storycard.value,
    id: shortId.generate()
  }
  data.cards.push(cd) // Add new card to data
  render.showCard(stories) // Add new card to the DOM
  render.setLocalStorage('cardsData', data.cards) // Store new card
  render.dropCards('.story.card', '.drag-category') // Drag and drop
  newCard.reset()
})

// Create a Category
const categoryForm = document.querySelector('#create-category')
const catSection = document.querySelector('.story-categories')

render.fillOutCategory(categoryForm) // Generate category Form
const saveCT = localStorage.getItem('categoryData') || '[]' // Retrieve category data if any
if (saveCT.length > 0) {
  data.categories = JSON.parse(saveCT)
  render.showCategory(catSection)
}

const newCategory = document.querySelector('#category')
newCategory.addEventListener('submit', (e) => {
  e.preventDefault()
  const ct = {
    category: e.target.catcard.value,
    cid: shortId.generate(),
    cards: []
  }
  data.categories.push(ct) // Add new card to data
  render.showCategory(catSection) // Add new card to the DOM
  render.setLocalStorage('categoryData', data.categories) // Store new category
  render.dropCards('.story.card', '.drag-category') // Drag and drop
  $('.box.category').draggable()
  newCategory.reset()
})

// New Exercise
const newE = document.querySelector('#new')
newE.addEventListener('click', () => {
  localStorage.clear()
  stories.innerHTML = ''
  catSection.innerHTML = ''
  window.location.reload(true)
})
