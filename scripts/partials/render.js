const templates = require('./templates')
const data = require('./data')

const headerJS = () => {
  // Get all "navbar-burger" elements
  const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if (navbarBurgers.length > 0) {
    // Add a click event on each of them
    navbarBurgers.forEach(el => {
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

// Render the Story Card Form
const fillOutCard = (container) => container.innerHTML = templates.cardForm()

// Render Story Card
const showCard = (container) => {
  const cards = data.cards.map(card => templates.storyCard(card.text, card.id)).join('')
  container.innerHTML = cards

  const del = document.querySelectorAll('a.fa-times')
  handleRemove(del)

  dropCards('.story.card', '.drag-category')
}

// Show Category Form
const fillOutCategory = (container) => container.innerHTML = templates.catForm()

// Show Category Panel
const showCategory = (container) => {

  const cats = data.categories.map(cats => templates.cardCategory(cats.text, cats.id)).join('')
  container.innerHTML = cats

  dropCards('.story.card', '.drag-category')
}

const dropCards = (drag, drop) => {

  // Drag and drop function
  $(drag).draggable()

  //Drag function
  $(drop).droppable({
    accept: drag,
    drop: function (event, ui) {
      const cardId = ui.draggable[0].getAttribute('data-id')
      const card = document.querySelector(`#card-${cardId}`)
      const findIndex = data.cards.find(card => card.id === cardId)
      const idx = data.cards.indexOf(findIndex)

      const cty = this.getAttribute('data-cat')
      const category = data.categories.find(cat => cat.id === cty)
      const catIdx = data.categories.indexOf(category)

      data.categories[catIdx].cards.push(findIndex)
      data.cards.splice(idx, 1)
      let catSorted = data.categories[catIdx].cards.map((card) => templates.sortedCards(card.id, card.text)).join('')
      this.innerHTML = catSorted
      $(card).remove()

      // Local Storge Setup
      const storage = localStorage.getItem('results') || ''

        if (storage.length > 0) {
          data.categories = JSON.parse(storage)
          const catSection = document.querySelector('.story-categories')
          showCategory(catSection)
        }
    }
  })
}

// Remove a Story Card
const handleRemove = (deleter) => {
  for (d of deleter) {
    d.addEventListener('click', (e) => {
      e.preventDefault()
      // find parent to be deleted
      const target = e.target.parentNode
      target.remove() // delete it!
      const cardId = target.getAttribute('data-id')
      const story = data.cards.find(story => story.id === cardId)
      const index = data.cards.indexOf(story)

      if (index >= 0) {
        data.cards.splice(index, 1)

        //Render Cards and Save to Storage
        showCard(stories)
        setLocalStorage('cardsData', data.cards)

      }
    })
  }
}

const setLocalStorage = (dataType, dataSource) => {
  return localStorage.setItem( dataType, JSON.stringify(dataSource));
}


module.exports = {
  headerJS, fillOutCard, showCard, handleRemove, fillOutCategory, showCategory, dropCards, setLocalStorage
}
