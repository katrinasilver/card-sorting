const render = require('./partials/render')
const data = require('./partials/data')
const shortId = require('short-id')

// Responsive header config
render.headerJS()

// Create an instance of story card
const addCardElement = document.querySelector('.create.button:not(.import)')
addCardElement.addEventListener('click', (e) => {

  // Add a card
  const storyForm = document.querySelector('#storyForm')
  render.fillOutCard(storyForm)

  const stories = document.querySelector('#stories')
  render.showAll(stories)

  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let val = {
      "text": e.target.storycard.value,
      "id": shortId.generate()
    }
    console.log(val)
    data.unshift(val)
    render.showAll(stories)
  })

  //Delete a card
  const del = document.querySelectorAll('a.fa-times')
  render.handleRemove(del)

  // Save contents of card
  // const save = document.querySelector('a.fa-check')
  // console.log(save);
//   save.addEventListener('click', (e) => {
//     const newStory = e.target.storycard.value
//     console.log(newStory);

//     data.unshift(newStory)
//     render.addStoryCard(stories)
//  })

})

// Create an instance of card category
const addCategory = document.querySelector('.create.category.button')
addCategory.addEventListener('click', (e) => {
  const category = document.querySelector('.story-categories')
  render.addCategory(category)
})
