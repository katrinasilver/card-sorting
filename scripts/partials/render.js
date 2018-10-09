const templates = require('./templates')
const data = require('./data')
const shortId = require('short-id')

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

const fillOutCard = (container) => container.innerHTML = templates.cardForm()

const showCard = (container) => {
  const cards = data.cards.map(card => templates.storyCard(card.text, card.id)).join('')
  container.innerHTML = cards

  // drag and drop function
  $('.story.card').draggable({
    drag: (event, ui) => { console.log('here') }
  })
  $('#stories').droppable({
    accept: '.story.card',
    drop: (event, ui) => { console.log('here') }
  })
}

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

const fillOutCategory = (container) => container.innerHTML = templates.catForm()

const showCategory = (container) => {
  const cats = data.categories.map(cats => templates.cardCategory(cats.text, cats.id)).join('')
  container.innerHTML = cats

  //drag function
  $('.drag-category').droppable({
    accept: '.story.card',
    drop: function (event, ui) {
      const cardId = ui.draggable[0].getAttribute('data-id')
      const content = ui.draggable
      for (let i = 0; i < content.length; i++) {
        // const insert = data.sorted.map(contents => templates.dragCards(contents.id, contents.text))
        $(ui.draggable[i]).remove()
        $(this).append(`<li data-id="card-${cardId}">${content[i].textContent}</li>`)
      }
    }
  })
}

const showSorted = (container) => {
  data.sorted.push({ id: shortId.generate(), text: '', category: '', catId: `cat-${shortId.generate()}`  })
  container.innerHTML = templates.sortedCards(data.sorted)
}

module.exports = {
  headerJS, fillOutCard, showCard, handleRemove, fillOutCategory, showCategory, showSorted
}
