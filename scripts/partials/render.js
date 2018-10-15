const templates = require('./templates')
const data = require('./data')

const headerJS = () => {
  const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0) // Get all "navbar-burger" elements

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

// Generate the Forms
const fillOutCard = (container) => container.innerHTML = templates.cardForm()
const fillOutCategory = (container) => container.innerHTML = templates.catForm()

// Create Card Elements
const showCard = (container) => {
  const cards = data.cards.map(card => templates.storyCard(card.cardvalue, card.id)).join('')
  container.innerHTML = cards
  handleRemove(document.querySelectorAll('a.fa-times')) // Remove card
  dropCards('.story.card', '.drag-category') // Drag and drop
}

// Create Category Elements
const showCategory = (container) => {
  const cats = data.categories.map(cats => templates.cardCategory(cats.category, cats.cid)).join('')
  container.innerHTML = cats
  dropCards('.story.card', '.drag-category') // Drag and drop
}

const dropCards = (drag, drop) => {
  $(drag).draggable() // Cards become draggable
  $(drop).droppable({ // Categories can take cards
    accept: drag,
    drop: function (event, ui) { // event needs to be present!
      event.preventDefault()
      // Target the specific card being dragged //
      const cardId = ui.draggable[0].getAttribute('data-id') // get data-id of each card
      const card = document.querySelector(`#card-${cardId}`) // find the cards
      const foundCard = data.cards.find(card => card.id === cardId)
      const idx = data.cards.findIndex(card => card.id === cardId)

      const cty = this.getAttribute('data-cat') // get the current category's data-cat
      const catIdx = data.categories.findIndex(cat => cat.cid === cty) // find category index
      data.cards.splice(idx, 1) // remove the found card from data.cards
      data.categories[catIdx].cards.push(foundCard) // push the found card into this category

      const catSorted = data.categories[catIdx].cards.map((card) => templates.sortedCards(card.id, card.cardvalue)).join('') // map the selected cards to template for sorted cards
      $(card).remove() // remove the card from #stories
      this.innerHTML = catSorted
      setLocalStorage('categoryData', data.categories) // Save data to storage

      const submit = document.querySelector('#complete')
      const catSection = document.querySelector('.story-categories')

      // Create a parsable data model
      const sort = {
        category: data.categories[catIdx].category,
        card: data.categories[catIdx].cards[idx].cardvalue,
        id: data.categories[catIdx].cards[idx].id
      }

      data.sorted.push(sort)
      setLocalStorage('sorted', data.sorted) // store sorted data

      submit.addEventListener('click', () => {
        const result = data.sorted.map((data) => templates.final(data.category, data.card, data.id)).join('')
        catSection.innerHTML = result
      })
    }
  })
}

// Remove a Story Card
const handleRemove = (deleter) => {
  for (d of deleter) {
    d.addEventListener('click', (e) => {
      e.preventDefault()
      const target = e.target.parentNode
      const cardId = target.getAttribute('data-id') // get the data-id of each cards
      const card = data.cards.find(card => card.id === cardId) // compare id to id's in the data
      const index = data.cards.indexOf(card) // get the index of the card to be deleted
      target.remove() // delete the card

      if (index >= 0) {
        data.cards.splice(index, 1)
        showCard(stories) // Update the DOM nodes
        setLocalStorage('cardsData', data.cards) // Save the updated card data to storage
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
