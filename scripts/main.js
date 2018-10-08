const render = require('./partials/render')
const data = require('./partials/data')

// Responsive header config
render.headerJS()

// Create an instance of story card
const addCardElement = document.querySelector('.create.button:not(.import)')
addCardElement.addEventListener('click', (e) => {

  // Add a card
  const stories = document.querySelector('#stories')
  render.addStoryCard(stories)

  // Delete a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)
  // Save contents of card
  const save = document.querySelector('a.fa-check')
  // console.log(save);
  save.addEventListener('click', (e) => {
    const newStory = e.target.storycard.value
    console.log(newStory);

    data.unshift(newStory)
    render.addStoryCard(stories)
 })

})

// Create an instance of card category
const addCategory = document.querySelector('.create.category.button')
addCategory.addEventListener('click', (e) => {
  const category = document.querySelector('.story-categories')
  render.addCategory(category)
})
