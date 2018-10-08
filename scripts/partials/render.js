const templates = require('./templates')
const data = require('./data')

const headerJS = () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target)
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
}

const addStoryCard = (container) => {
  let story = templates.storyCard()
  container.innerHTML += story
}

const addCategory = (container) => {
  let category = templates.cardCategory()
  container.innerHTML += category;
}

const handleRemove = (deleter) => {
  for (d of deleter) {
    d.addEventListener('click', (e) => {
      let parent = e.target.parentNode
      parent.remove()
    })
  }
}

const saveCard = (save) => {
  for (let s of save) {
    s.addEventListener('click', () => {
      let textarea = document.querySelector('.storyline')
      console.log(textarea.value)
    })
  }
}

module.exports = {
  addStoryCard, addCategory, handleRemove, headerJS, saveCard
}
