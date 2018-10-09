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

const fillOutCard = (container) => container.innerHTML = templates.cardForm()

const showCard = (container) => {
  const cards = data.cards.map(card => templates.storyCard(card.text, card.id)).join('')
  container.innerHTML = cards
}

const handleRemove = (deleter) => {
  for (d of deleter) {
    d.addEventListener('click', (e) => {
      const target = e.target.parentNode
      target.remove()
      const stories = document.querySelector('#stories')
      const cardId = target.getAttribute('data-id')
      const story = data.cards.find(story => story.id === cardId)
      const index = data.cards.indexOf(story)

      if (index >= 0) {
        data.cards.splice(index, 1)
        stories.innerHTML = templates.storyValue(data.cards)
        const del = document.querySelectorAll('a.fa-times')
        handleRemove(del)
      }
    })
  }
}

const fillOutCategory = (container) => container.innerHTML = templates.catForm()

const showCategory = (container) => {
  const cats = data.categories.map(cats => templates.cardCategory(cats.text, cats.id)).join('')
  container.innerHTML = cats
}

module.exports = {
  headerJS, fillOutCard, showCard, handleRemove, fillOutCategory, showCategory
}
