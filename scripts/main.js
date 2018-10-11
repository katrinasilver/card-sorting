const render = require('./partials/render')
const data = require('./partials/data')
const shortId = require('short-id')

render.headerJS()

// Create a card
const storyForm = document.querySelector('#storyForm')
render.fillOutCard(storyForm)

// Get Cards Data and Save to Local Storage
const stories = document.querySelector('#stories')
const saveC = localStorage.getItem('cardsData') || '[]'

if (saveC.length > 0) {
  data.cards = JSON.parse(saveC)
  render.showCard(stories)
}

// Show the new card in stories section
const form1 = document.querySelector('#card')
form1.addEventListener('submit', (e) => {
  e.preventDefault()
  const cd = {
    "text": e.target.storycard.value,
    "id": shortId.generate()
  }
  data.cards.unshift(cd)

  //Render Cards and Save to Storage
  render.showCard(stories)
  render.setLocalStorage('cardsData', data.cards)

  // Enable drap and drop
  render.dropCards('.story.card', '.drag-category')

  form1.reset()
})

// Create a Category
const categoryForm = document.querySelector('#create-category')
render.fillOutCategory(categoryForm)

// Get Category Data and Save to Local Storage
const catSection = document.querySelector('.story-categories')
const saveCT = localStorage.getItem('categoryData') || '[]'

if (saveCT.length > 0) {
  data.categories = JSON.parse(saveCT)
  render.showCategory(catSection)
}

const form2 = document.querySelector('#category')
form2.addEventListener('submit', (e) => {
  e.preventDefault()
  const ct = {
    "text": e.target.catcard.value,
    "id": shortId.generate(),
    "cards": []
  }

  // Show created category
  data.categories.unshift(ct)

  //Render Categories and Save to Storage
  render.showCategory(catSection)
  render.setLocalStorage('categoryData', data.categories)

  // Enable drap and drop
  render.dropCards('.story.card', '.drag-category')

  // $('.box.category').draggable()

  form2.reset()
})
