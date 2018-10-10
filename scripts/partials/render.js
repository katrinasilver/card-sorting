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
const fillOutCard = (container) => {
    container.innerHTML = templates.cardForm()
}

// Render Story Card
const showCard = (container) => {
  const cards = data.cards.map(card => templates.storyCard(card.text, card.id)).join('')
  container.innerHTML = cards
}

// Show Category Form
const fillOutCategory = (container) => container.innerHTML = templates.catForm()

// Show Category Panel
const showCategory = (container) => {
  const cats = data.categories.map(cats => templates.cardCategory(cats.text, cats.id)).join('')
  container.innerHTML = cats
}

const dragDrop = (drag, drop) => {

  // Drag and drop function
  $(drag).draggable()

  //Drag function
  $(drop).droppable({
    accept: drag,
    drop: function (event, ui) {
      const cards = ui.draggable
      const cardId = ui.draggable[0].getAttribute('data-id')
      for (let card of cards) {
        $(card).remove()
        // console.log(cardId);
        $(this).append(templates.sortedCards(cardId, card.innerText))
      }

      const sortedCard = document.querySelector(`#sorted-${cardId}`)
      sortedCard.addEventListener('click', (e) => {
        $('#stories').append(templates.storyCard(e.target.textContent, e.target.cardId))
        $(e.target).remove()
        $(drag).draggable()
      })
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

        const stories = document.querySelector('#stories')
        stories.innerHTML = templates.storyValue(data.cards)

        const del = document.querySelectorAll('a.fa-times')
        handleRemove(del)
      }
    })
  }
}

module.exports = {
  headerJS, fillOutCard, showCard, handleRemove, fillOutCategory, showCategory, dragDrop
}
